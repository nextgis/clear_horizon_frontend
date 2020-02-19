import { NgwMapOptions, NgwLayerOptions } from '@nextgis/ngw-map';
import { ActionMap } from './components/ActionMap';
import './bulma';

export interface AsuLayer {
  name: string;
}

export interface ConnectionOptions {
  acsUrl?: string;
  authUrl: string;
  showUrl: string;
}

export type FireResource = NgwLayerOptions<'GEOJSON'>;

export interface Bookmark {
  id: string;
  name: string;
}

export type Bookmarks = Bookmark[];

export interface BaseLayer {
  name?: string;
  qmsId: number;
}

export interface AppOptions {
  mapOptions?: NgwMapOptions;
  fires?: NgwLayerOptions<'GEOJSON'>[];
  userFires?: NgwLayerOptions<'GEOJSON'>;
  basemaps?: BaseLayer[];
  timedelta?: 24;
}

export class App {
  actionMap = new ActionMap(this.options);

  constructor(public options?: AppOptions) {}

  async create(options?: AppOptions) {
    this.options = { ...this.options, ...options };
    this.actionMap.create(this.options);
  }
}
