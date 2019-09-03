import NgwMap, { NgwMapOptions, ToggleControl, NgwLayers } from '@nextgis/ngw-map';

import { getIcon } from '@nextgis/icons';

import MapAdapter from '@nextgis/leaflet-map-adapter';
import 'leaflet/dist/leaflet.css';

// import MapAdapter from '@nextgis/ol-map-adapter';
// import 'ol/ol.css';

import { AppOptions, FireResource } from 'src/App';
import { WebmapTreeControl } from './WebmapTree/WebmapTreeControl';
import { Auth } from './Auth/Auth';
import { Feature, MultiPoint, Geometry } from 'geojson';
import {
  FeatureLayersIdentify,
  CancelablePromise,
  ResourceItem,
  FeatureItemAttachment
} from '@nextgis/ngw-connector';
import NgwKit from '@nextgis/ngw-kit';

interface FunctionArg {
  argType: 'function';
  body: string;
}

interface WebMapRemote {
  type: 'webmap_remote';
  cmd: string;
  args?: Array<any | FunctionArg>;
}

interface Firms {
  acq_date: string;
  acq_time: string; // '09:06';
  bright_t31?: number;
  brightness?: number;
  confidence: string;
  daynight: 'D';
  frp: number;
  latitude: number;
  longitude: number;
  satellite: 'N';
  scan: number;
  track: number;
  version: string;
}

export class ActionMap {
  ngwMap: NgwMap<L.Map, L.Layer, any>;

  tree?: WebmapTreeControl;
  treeControl?: L.Control & ToggleControl;

  authControl?: L.Control & ToggleControl;

  private _resourceItems: { [resourceId: number]: ResourceItem } = {};

  private _promises: { [name: string]: CancelablePromise<any> } = {};

  constructor(private options: AppOptions) {
    // ignore
  }

  async create(options: NgwMapOptions, fires?: FireResource[]) {
    const auth = new Auth(options);
    await auth.login();
    this.ngwMap = new NgwMap(new MapAdapter(), {
      controls: [],
      connector: auth.connector,
      ...options
    });

    this.ngwMap.getPaintFunctions = { base: getIcon };

    this.ngwMap.addControl('ZOOM', 'top-left');
    this.ngwMap.addControl('ATTRIBUTION', 'bottom-right');

    this.authControl = await this.ngwMap.createButtonControl({
      html: '<span>&#10162;</span>',
      title: 'Выйти',
      onClick: () => {
        auth.logout();
        window.location.reload();
      }
    });
    this.ngwMap.addControl(this.authControl, 'top-right');

    const ngwLayers = await this.ngwMap.getNgwLayers();

    if (fires) {
      for (const x of fires) {
        await this.ngwMap.addNgwLayer({
          resourceId: x.resourceId,
          id: x.id,
          adapterOptions: {
            propertiesFilter: [
              [
                'timestamp',
                'ge',
                Math.floor(Date.now() / 1000) - Number(this.options.timedelta) * 3600
              ]
            ],
            paint: { stroke: true, color: x.color, fillOpacity: 0.6, radius: 5 },
            selectable: true,
            selectedPaint: { stroke: true, color: x.color, fillOpacity: 0.9, radius: 7 },
            selectOnHover: true,
            popupOnSelect: true,
            popupOptions: {
              createPopupContent: e => {
                if (e.feature) {
                  const feature = e.feature as Feature<MultiPoint, Firms>;
                  return this._createPopupContent<MultiPoint, Firms>(feature);
                }
              }
            }
          }
        });
      }
    }
    await this._addTreeControl(ngwLayers, fires);
    this._addEventsListeners();
  }

  private _createPopupContent<G extends Geometry = any, P = any>(
    feature: Feature<G, P>
  ): HTMLElement {
    const popupElement = document.createElement('div');
    const pre = document.createElement('pre');
    pre.className = 'properties';
    pre.innerHTML = JSON.stringify(feature.properties, null, 2);
    pre.style.whiteSpace = 'pre-wrap';
    popupElement.appendChild(pre);
    return popupElement;
  }

  private async _addTreeControl(ngwLayers: NgwLayers, fires: FireResource[]) {
    await this.ngwMap.onLoad();

    this.tree = new WebmapTreeControl(this, {
      ngwLayers,
      ngwMap: this.ngwMap,
      fires
    });
    this.treeControl = await this.ngwMap.createToggleControl(this.tree);

    this.ngwMap.addControl(this.treeControl, 'top-left');
  }

  private _clean() {
    if (this._promises.getFeaturePromise && this._promises.getFeaturePromise.cancel) {
      this._promises.getFeaturePromise.cancel();
    }
    this.ngwMap.removeLayer('highlight');
  }

  private async _getResourceItem(resourceId: number) {
    if (!this._resourceItems[resourceId]) {
      const item = await this.ngwMap.connector.get('resource.item', null, { id: resourceId });
      this._resourceItems[resourceId] = item;
    }
    return this._resourceItems[resourceId];
  }

  private async _updateElementContent<G extends Geometry = any, P = any>(
    element: HTMLElement,
    resourceId: number,
    feature: Feature<G, P>
  ) {
    const item = await this._getResourceItem(resourceId);
    if (item.feature_layer) {
      const newProperties = {};
      item.feature_layer.fields.forEach(x => {
        const property = feature.properties[x.keyname];
        if (property) {
          newProperties[x.display_name] = property;
        }
      });
      const newContent = JSON.stringify(newProperties, null, 2);
      const pre = element.getElementsByClassName('properties')[0];
      if (pre) {
        pre.innerHTML = newContent;
      }
    }
  }

  private _loadImage(
    img: FeatureItemAttachment,
    options: { id: number; fid: number; width?: number; height?: number }
  ) {
    return new Promise<string>(async (resolve, reject) => {
      const { width, height } = options;
      const url =
        '/api/resource/' +
        options.id +
        '/feature/' +
        options.fid +
        `/attachment/${img.id}/image` +
        (width && height ? `?size=${width}x${height}` : '');
      const blob = await this.ngwMap.connector.makeQuery(url, {}, { responseType: 'blob' });
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
    });
  }

  private async _addPhotos(
    element: HTMLElement,
    attachment: FeatureItemAttachment[],
    id: number,
    fid: number
  ) {
    const attachmentElement = document.createElement('div');
    attachmentElement.className = 'attachment';
    for (const img of attachment) {
      const src = await this._loadImage(img, {
        width: 100,
        height: 100,
        id,
        fid
      });
      const imgElem = document.createElement('img');
      imgElem.src = src;
      attachmentElement.appendChild(imgElem);
    }
    element.appendChild(attachmentElement);
  }

  private _highlighNgwLayer(e: FeatureLayersIdentify) {
    this._clean();
    const params = NgwKit.utils.getIdentifyGeoJsonParams(e);
    if (params) {
      const resourceId = params.resourceId;
      this._promises.getFeaturePromise = this.ngwMap.connector
        .get('feature_layer.feature.item', null, {
          id: params.resourceId,
          fid: params.featureId,
          geom_format: 'geojson',
          srs: 4326
        })
        .then(item => {
          delete this._promises.getFeaturePromise;
          const geojson = NgwKit.utils.createGeoJsonFeature(item);
          this.ngwMap.addLayer('GEOJSON', {
            id: 'highlight',
            data: geojson,
            visibility: true,
            paint: { color: 'green', stroke: true, fillOpacity: '0.8' },
            // selectable: true,
            selectOnHover: true,
            popup: true,
            // popupOnSelect: true,
            popupOptions: {
              createPopupContent: e => {
                if (e.feature) {
                  const element = this._createPopupContent(e.feature);
                  this._updateElementContent(element, resourceId, e.feature);
                  if (
                    item.extensions &&
                    item.extensions.attachment &&
                    item.extensions.attachment.length
                  ) {
                    this._addPhotos(
                      element,
                      item.extensions.attachment,
                      params.resourceId,
                      params.featureId
                    );
                  }
                  return element;
                }
              }
            }
          });
        });
    }
  }

  private _addEventsListeners() {
    this.ngwMap.emitter.on('ngw:select', e => this._highlighNgwLayer(e));

    const togglers = [this.tree];
    const controls = [this.treeControl];
    togglers.forEach((x, i) => {
      if (x) {
        x.emitter.on('status', (status: boolean) => {
          if (status) {
            controls.forEach((y, j) => {
              if (y && i !== j) {
                y.onClick(false);
              }
            });
          }
        });
      }
    });
  }
}
