import 'bulma/bulma.sass';
import './App.css';

import { NgwMapOptions } from '@nextgis/ngw-map';
import { ActionMap } from './components/ActionMap';

export interface AsuLayer {
  name: string;
}

export interface ConnectionOptions {
  acsUrl?: string;
  authUrl: string;
  showUrl: string;
}

export interface FireResource {
  resourceId: number;
  id: string;
  color?: string;
}

export interface Bookmark {
  id: string;
  name: string;
}

export type Bookmarks = Bookmark[];

export interface BaseLayer {
  nameÍ: string;
  qmsId: number;
}

export interface AppOptions {
  mapOptions?: NgwMapOptions;
  fires?: FireResource[];
  basemaps?: BaseLayer[];
  timedelta?: 24;
}

export class App {
  actionMap = new ActionMap(this.options);

  constructor(public options?: AppOptions) {}

  async create(options?: AppOptions) {
    this.options = { ...this.options, ...options };
    this.actionMap.create(this.options.mapOptions, this.options.fires, this.options.basemaps);
  }
}
