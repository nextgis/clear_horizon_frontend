import { ActionMap } from './components/ActionMap';
import './bulma';

import type { NgwMapOptions } from '@nextgis/ngw-map';
import type { NgwLayerOptions } from '@nextgis/ngw-kit';

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
  timedelta: number;
}

export class App {
  actionMap: ActionMap;

  constructor(public options: Partial<AppOptions> = {}) {
    this.actionMap = new ActionMap(options);
  }

  async create(options?: AppOptions): Promise<void> {
    this.options = { ...this.options, ...options };
    // show app html after js and css loading and before map drawing start
    this.showContent();
    await this.actionMap.create(this.options);
  }

  showContent(): void {
    const appContent = document.getElementById('app');
    const appLoadingContent = document.getElementById('app-loading');
    if (appLoadingContent) {
      appLoadingContent.style.display = 'none';
    }
    if (appContent) {
      appContent.style.display = 'block';
    }
  }
}
