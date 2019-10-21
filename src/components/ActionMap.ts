import 'leaflet/dist/leaflet.css';
import 'bulma-carousel/dist/css/bulma-carousel.min.css';
import './ActionMap.css';
import NgwMap, { NgwMapOptions, ToggleControl, NgwLayers, LocationEvent } from '@nextgis/ngw-map';
import NgwKit from '@nextgis/ngw-kit';
import { getIcon } from '@nextgis/icons';
import MapAdapter from '@nextgis/leaflet-map-adapter';
import { QmsAdapterOptions } from '@nextgis/qms-kit';
import { Feature, MultiPoint } from 'geojson';

// import MapAdapter from '@nextgis/ol-map-adapter';
// import 'ol/ol.css';

import { AppOptions, FireResource, BaseLayer } from '../App';
import { MapSettingsPanelControl } from './MapSettingsPanel/MapSettingsPanelControl';
import { Auth } from './Auth/Auth';
import {
  FeatureLayersIdentify,
  CancelablePromise,
  ResourceHierarchy
} from '@nextgis/ngw-connector';
import { Popup } from './Popup';

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

  tree?: MapSettingsPanelControl;
  treeControl?: L.Control & ToggleControl;

  authControl?: L.Control & ToggleControl;
  popup: Popup;

  private _promises: { [name: string]: CancelablePromise<any> } = {};

  constructor(private options: AppOptions) {
    this.popup = new Popup(this.ngwMap);
  }

  async create(options: NgwMapOptions, fires?: FireResource[], basemaps?: BaseLayer[]) {
    const auth = new Auth(options);
    const opt = { ...options };
    try {
      await auth.login();
      opt.connector = auth.connector;
    } catch (er) {
      // cancel login
    }
    this.ngwMap = new NgwMap(new MapAdapter(), {
      controls: [],
      minZoom: 4,
      ...opt
    });
    this.ngwMap.setCursor('default');
    this.popup.setNgwMap(this.ngwMap);
    if (basemaps) {
      this.ngwMap.onLoad().then(() =>
        basemaps.forEach((x, i) => {
          this.ngwMap.addBaseLayer<any, QmsAdapterOptions>('QMS', { ...x, visibility: i === 0 });
        })
      );
    }
    this.ngwMap.getPaintFunctions = { base: getIcon };

    this.ngwMap.addControl('ZOOM', 'top-left');
    this.ngwMap.addControl('ATTRIBUTION', 'bottom-right');
    await this._createAuthControl(auth);
    this.ngwMap.addControl(this.authControl, 'top-right');

    const ngwLayers = await this.ngwMap.getNgwLayers();
    const bookmarks: ResourceHierarchy[] = [];
    Object.values(ngwLayers).forEach(x => {
      const bookmark = x.layer.item && x.layer.item.webmap && x.layer.item.webmap.bookmark_resource;
      if (bookmark) {
        bookmarks.push(bookmark);
      }
    });
    await this._addFires(fires);

    this._addTreeControl({ ngwLayers, fires, bookmarks });

    this._locate();

    this._addEventsListeners();
  }

  private _locate() {
    const locationfound = (e: LocationEvent) => {
      const lngLat = e.lngLat;
      // const lngLat: [number, number] = [40, 46];
      // TODO: get extent from webmap or frame layer;
      const extent = this.ngwMap.getBounds();
      if (extent) {
        const [minLng, minLat, maxLng, maxLat] = extent;
        const [lng, lat] = lngLat;
        const isLngInBbox = minLng < lng && lng < maxLng;
        const isLatInBbox = minLat < lat && lat < maxLat;
        if (isLngInBbox && isLatInBbox) {
          this.ngwMap.setCenter(lngLat);
        }
      }
    };

    this.ngwMap.locate({ setView: false }, { locationfound });
  }

  private async _createAuthControl(auth: Auth) {
    this.authControl = await this.ngwMap.createToggleControl({
      html: {
        on: '<div class="sign-out--btn"><i class="fas fa-sign-out-alt"></i></div>',
        off: '<div class="sign-out--btn"><i class="fas fa-sign-in-alt"></i></div>'
      },
      title: { on: 'Выйти', off: 'Войти' },
      getStatus: () => {
        return !!(this.ngwMap.connector && this.ngwMap.connector.user);
      },
      onClick: () => {
        auth.logout();
        window.location.reload();
      }
    });
  }

  private async _addFires(fires?: FireResource[]) {
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
                  return this.popup.createPopupContent<MultiPoint, Firms>(feature);
                }
              }
            }
          }
        });
      }
    }
  }

  private async _addTreeControl(opt: {
    ngwLayers: NgwLayers;
    fires: FireResource[];
    bookmarks: ResourceHierarchy[];
  }) {
    await this.ngwMap.onLoad();

    this.tree = new MapSettingsPanelControl(this, {
      ngwMap: this.ngwMap,
      ...opt
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

  private _highlighNgwLayer(e: FeatureLayersIdentify) {
    this._clean();
    const paramsList = NgwKit.utils.getIdentifyGeoJsonParams(e);
    const params = paramsList[0];
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
                  const element = this.popup.createPopupContent(e.feature);
                  this.popup.updateElementContent(element, resourceId, e.feature);
                  if (
                    item.extensions &&
                    item.extensions.attachment &&
                    item.extensions.attachment.length
                  ) {
                    this.popup._addPhotos(
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
