import NgwMap, { NgwMapOptions, ToggleControl, NgwLayers } from '@nextgis/ngw-map';

import { getIcon } from '@nextgis/icons';

import MapAdapter from '@nextgis/leaflet-map-adapter';
import 'leaflet/dist/leaflet.css';

// import MapAdapter from '@nextgis/ol-map-adapter';
// import 'ol/ol.css';

import { AppOptions } from 'src/App';
import { WebmapTreeControl } from './WebmapTree/WebmapTreeControl';
import NgwConnector from '@nextgis/ngw-connector';
import { Auth } from './Auth';

interface FunctionArg {
  argType: 'function';
  body: string;
}

interface WebMapRemote {
  type: 'webmap_remote';
  cmd: string;
  args?: Array<any | FunctionArg>;
}

export class ActionMap {

  ngwMap: NgwMap<L.Map, L.Layer, any>;

  connector: NgwConnector;
  tree?: WebmapTreeControl;
  treeControl?: L.Control & ToggleControl;

  constructor(private options: AppOptions) {
    this.connector = new NgwConnector({baseUrl: options.mapOptions.baseUrl, auth: options.mapOptions.auth});
  }

  async create(options: NgwMapOptions) {
    let connectionOk = false;
    try {
      connectionOk = !!await this.connector.connect();
    } catch (er) {
      // handle error
    }
    if (!connectionOk) {
      const auth = new Auth();
      const credentials = await auth.getAuth();
      await this.connector.login(credentials);
    }

    this.ngwMap = new NgwMap(new MapAdapter(), {
      controls: [],
      connector: this.connector,
      ...options
    });

    this.ngwMap.getPaintFunctions = { base: getIcon };

    this.ngwMap.addControl('ZOOM', 'top-left');
    this.ngwMap.addControl('ATTRIBUTION', 'bottom-right');

    const ngwLayers = await this.ngwMap.getNgwLayers();
    await this._addTreeControl(ngwLayers);

    this._addEventsListeners();
  }

  executeWebMapCommand(descriptor: WebMapRemote): any {
    if (this.ngwMap && descriptor.type === 'webmap_remote') {
      const cmd = descriptor.cmd;
      const args = [].concat(descriptor.args).map((y) => {
        if (y && y.argType && y.argType === 'function') {
          // tslint:disable-next-line:function-constructor
          return new Function('return ' + y.body)();
        }
        return y;
      });
      const exec = this.ngwMap[cmd];
      if (exec) {
        return exec.apply(this.ngwMap, args);
      }
    }
  }

  private async _addTreeControl(ngwLayers: NgwLayers) {
    await this.ngwMap.onLoad();

    this.tree = new WebmapTreeControl(this, { ngwLayers });
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

