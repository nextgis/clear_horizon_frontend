import './WebmapTree.css';

import { WebmapTreeOptions } from './interfaces';

import { NgwLayers } from '@nextgis/ngw-map';

import { CollapsiblePanel } from './CollapsiblePanel';
import { WebmapTreeItem } from './WebmapTreeItem';


const OPTIONS: WebmapTreeOptions = {
  target: 'tree',
  width: 300,
};

export class WebmapTree {

  options: WebmapTreeOptions;

  private _container: HTMLElement;
  private _target: HTMLElement;

  private ngwLayers!: NgwLayers;
  private _panels: CollapsiblePanel[];

  constructor(options: WebmapTreeOptions) {
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

    const ngwPanel = new CollapsiblePanel({
      title: 'Базовые слои',
      content: () => this._createNgwlayers(),
      open: false,
      parent: container
    });


    return container;
  }

  private _createNgwlayers() {
    const container = document.createElement('div');
    container.className = '';
    for (const n in this.ngwLayers) {
      if (this.ngwLayers.hasOwnProperty(n)) {
        const ngwLayer = this.ngwLayers[n];
        const tree = new WebmapTreeItem(ngwLayer.layer.layer);
        const treeContainer = tree.getContainer();
        if (treeContainer) {
          container.appendChild(treeContainer);
        }
      }
    }
    return container;
  }

}
