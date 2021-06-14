import './MapSettingsPanel.css';
// @ts-ignore
import Sidebar from 'leaflet-sidebar';
import 'leaflet-sidebar/src/L.Control.Sidebar.css';

import { NgwLayers } from '@nextgis/ngw-map';

import { ActionMap } from '../ActionMap';
import { CollapsiblePanel } from './CollapsiblePanel';
import { WebmapTreeItem } from './WebmapTreeItem';
import { FiresContainer } from './FiresContainer';
import { BaseMapsContainer } from './BaseMapsContainer';
import { BookmarksContainer } from './BookmarksContainer';
import { UserFiresContainer } from './UserFiresContainer';

import type { MapSettingsPanelOptions } from './interfaces';

const OPTIONS: Partial<MapSettingsPanelOptions> = {
  target: 'tree',
  // width: 300
};

export class MapSettingsPanel {
  options: MapSettingsPanelOptions;

  sidebar: Sidebar;

  private _container: HTMLElement;
  private _target?: HTMLElement;

  private ngwLayers!: NgwLayers;

  constructor(private actionMap: ActionMap, options: MapSettingsPanelOptions) {
    this.options = { ...OPTIONS, ...options };
    if (typeof this.options.target === 'string') {
      const target = document.getElementById(this.options.target);
      if (target) {
        this._target = target;
      } else {
        throw new Error(
          `No element with ID #${this.options.target} in document for webmap tree`,
        );
      }
    } else if (this.options.target instanceof HTMLElement) {
      this._target = this.options.target;
    }
    this.sidebar = new Sidebar(this._target, {
      closeButton: false,
      position: 'left',
      autoPan: false,
    });
    this.sidebar.addTo(this.actionMap.ngwMap.mapAdapter.map);

    this.ngwLayers = this.options.ngwLayers;

    this._container = this._createContainer();
    if (!this.options.status) {
      this.hide();
    }
    this._target && this._target.appendChild(this._container);
  }

  show(): void {
    this._container.classList.remove('hidden');
    this.sidebar.show();
  }

  hide(): void {
    this.sidebar.hide();
    this._container.classList.add('hidden');
  }

  private _createContainer(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'tree-container';

    if (this.options.width !== undefined) {
      container.style.width = this.options.width + 'px';
    }

    if (this.options.userFires) {
      new CollapsiblePanel({
        title: 'Пожары',
        content: () => this._createUserFiresContainer(),
        parent: container,
      });
    }
    if (this.options.fires) {
      new CollapsiblePanel({
        title: 'Термоточки (FIRMS)',
        content: () => this._createFiresContainer(),
        parent: container,
      });
    }
    new CollapsiblePanel({
      title: 'Базовые слои',
      content: () => this._createNgwLayers(),
      open: false,
      parent: container,
    });
    new CollapsiblePanel({
      title: 'Подложки',
      content: () => this._createBasemapsContainer(),
      open: false,
      parent: container,
    });
    new CollapsiblePanel({
      title: 'Закладки',
      content: () => this._createBookmarksContainer(),
      open: false,
      parent: container,
    });

    return container;
  }

  private _createNgwLayers() {
    const container = document.createElement('div');
    container.className = 'webmap-tree-container';
    for (const n in this.ngwLayers) {
      const ngwLayer = this.ngwLayers[n];
      const tree = new WebmapTreeItem(ngwLayer.layer.layer);
      const treeContainer = tree.getContainer();
      if (treeContainer) {
        container.appendChild(treeContainer);
      }
    }
    return container;
  }

  private _createBookmarksContainer() {
    const container = document.createElement('div');
    const bookmarks = this.options.bookmarks;
    if (bookmarks) {
      const bookmarkContainer = new BookmarksContainer({
        bookmarks,
        ngwMap: this.options.ngwMap,
      });
      container.appendChild(bookmarkContainer.getContainer());
    }
    return container;
  }

  private _createUserFiresContainer() {
    const container = document.createElement('div');
    if (this.options.userFires) {
      const firesContainer = new UserFiresContainer({
        fires: [this.options.userFires],
        ngwMap: this.options.ngwMap,
      });
      container.appendChild(firesContainer.getContainer());
    }
    return container;
  }

  private _createFiresContainer() {
    const container = document.createElement('div');
    const fires = this.options.fires;
    if (fires) {
      const firesContainer = new FiresContainer({
        fires,
        ngwMap: this.options.ngwMap,
      });
      container.appendChild(firesContainer.getContainer());
    }
    return container;
  }

  private _createBasemapsContainer() {
    const container = document.createElement('div');
    const fires = this.options.fires;
    if (fires) {
      const baseMapsContainer = new BaseMapsContainer({
        ngwMap: this.options.ngwMap,
      });
      container.appendChild(baseMapsContainer.getContainer());
    }
    return container;
  }
}
