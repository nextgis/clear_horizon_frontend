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
  color?: string;
}

export interface AppOptions {
  mapOptions?: NgwMapOptions;
  fires?: FireResource[];
}

export class App {

  actionMap = new ActionMap(this.options);

  constructor(public options?: AppOptions) {
  }

  async create(options?: AppOptions) {
    this.options = { ...this.options, ...options };
    this.actionMap.create(this.options.mapOptions, this.options.fires);
  }

}
