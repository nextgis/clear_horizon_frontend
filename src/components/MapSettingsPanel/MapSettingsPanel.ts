import './MapSettingsPanel.css';

import { MapSettingsPanelOptions } from './interfaces';

import { NgwLayers } from '@nextgis/ngw-map';

import { CollapsiblePanel } from './CollapsiblePanel';
import { WebmapTreeItem } from './WebmapTreeItem';
import { FiresContainer } from './FiresContainer';
import { BaseMapsContainer } from './BaseMapsContainer';

const OPTIONS: MapSettingsPanelOptions = {
  target: 'tree',
  width: 300
};

export class MapSettingsPanel {
  options: MapSettingsPanelOptions;

  private _container: HTMLElement;
  private _target: HTMLElement;

  private ngwLayers!: NgwLayers;

  constructor(options: MapSettingsPanelOptions) {
    this.options = { ...OPTIONS, ...options };
    if (typeof this.options.target === 'string') {
      const target = document.getElementById(this.options.target);
      if (target) {
        this._target = target;
      } else {
        throw new Error(`No element with ID #${this.options.target} in document for webmap tree`);
      }
    } else if (this.options.target instanceof HTMLElement) {
      this._target = this.options.target;
    }

    this.ngwLayers = this.options.ngwLayers;

    this._container = this._createContainer();
    if (!this.options.status) {
      this.hide();
    }
    this._target.appendChild(this._container);
  }

  show() {
    this._container.classList.remove('hidden');
  }

  hide() {
    this._container.classList.add('hidden');
  }

  private _createContainer() {
    const container = document.createElement('div');
    container.className = 'tree-container';

    container.style.width = (this.options.width || 300) + 'px';

    if (this.options.fires) {
      new CollapsiblePanel({
        title: 'Термоточки (FIRMS)',
        content: () => this._createFiresContainer(),
        parent: container
      });
    }
    new CollapsiblePanel({
      title: 'Базовые слои',
      content: () => this._createNgwLayers(),
      open: false,
      parent: container
    });
    new CollapsiblePanel({
      title: 'Подложки',
      content: () => this._createBasemapsContainer(),
      open: false,
      parent: container
    });

    return container;
  }

  private _createNgwLayers() {
    const container = document.createElement('div');
    container.className = '';
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

  private _createFiresContainer() {
    const container = document.createElement('div');
    const fires = this.options.fires;
    if (fires) {
      const firesContainer = new FiresContainer({
        fires,
        ngwMap: this.options.ngwMap
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
        ngwMap: this.options.ngwMap
      });
      container.appendChild(baseMapsContainer.getContainer());
    }
    return container;
  }
}