import NgwMap, { NgwMapOptions, ToggleControl, NgwLayers } from '@nextgis/ngw-map';

import { getIcon } from '@nextgis/icons';

import MapAdapter from '@nextgis/leaflet-map-adapter';
import 'leaflet/dist/leaflet.css';

// import MapAdapter from '@nextgis/ol-map-adapter';
// import 'ol/ol.css';

import { AppOptions, FireResource } from 'src/App';
import { WebmapTreeControl } from './WebmapTree/WebmapTreeControl';
import { Auth } from './Auth/Auth';
import { Feature, MultiPoint } from 'geojson';

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
              ['timestamp', 'ge', Math.floor(Date.now() / 1000) - (Number(this.options.timedelta) * 3600) ]
            ],
            paint: { stroke: true, color: x.color, fillOpacity: 0.6, radius: 5 },
            selectable: true,
            selectedPaint: { stroke: true, color: x.color, fillOpacity: 0.9, radius: 7 },
            selectOnHover: true,
            popupOnSelect: true,
            popupOptions: {
              createPopupContent: (e) => {
                if (e.feature) {
                  const feature = e.feature as Feature<MultiPoint, Firms>;
                  return this._createPopupContent(feature);
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

  private _createPopupContent(feature: Feature<MultiPoint, Firms>): HTMLElement {
    const popupElement = document.createElement('pre');
    popupElement.innerHTML = JSON.stringify(feature.properties, null, 2);
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

  private _addEventsListeners() {
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

