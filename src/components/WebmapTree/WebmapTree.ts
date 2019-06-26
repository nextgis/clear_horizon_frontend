import './WebmapTree.css';

import { WebmapTreeOptions } from './interfaces';
import { WebMapLayerItem, TreeGroup, TreeLayer } from '@nextgis/ngw-kit';
import { NgwLayers } from '@nextgis/ngw-map';
import WebMap from '@nextgis/webmap';
import { CheckProperty, CheckChangeEvent } from '@nextgis/item';


const OPTIONS: WebmapTreeOptions = {
  target: 'tree',
  width: 300,
};

export class WebmapTree {

  options: WebmapTreeOptions;

  private _container: HTMLElement;
  private _target: HTMLElement;

  private ngwLayers!: NgwLayers;

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
    for (const n in this.ngwLayers) {
      if (this.ngwLayers.hasOwnProperty(n)) {
        const ngwLayer = this.ngwLayers[n];
        const tree = this._createTreeItem(ngwLayer.layer.layer);
        container.appendChild(tree);
      }
    }

    return container;
  }

  private _createTreeBranch(layers: WebMapLayerItem[]) {
    const elem = document.createElement('div');
    elem.className = 'tree-container__item-children';
    layers.forEach((x) => {
      if (x.item) {
        const item = this._createTreeItem(x);
        elem.appendChild(item);
      }
    });
    return elem;
  }

  private _createTreeItem(layer: WebMapLayerItem) {
    const item: TreeGroup | TreeLayer = layer.item;
    const elem = document.createElement('div');
    elem.className = 'tree-container__item';
    if (item.display_name) {
      const input = document.createElement('input');
      input.setAttribute('type', 'checkbox');
      const value = item.item_type === 'layer' ? item.layer_enabled : true;
      input.checked = value;

      const visibility = layer.properties.property('visibility') as CheckProperty;
      if (visibility) {
        visibility.emitter.on('change', (ev: CheckChangeEvent) => {
          input.checked = ev.value;
        });
        input.onclick = () => {
          visibility.set(input.checked, {
            propagation: WebMap.keys.pressed('ctrl')
          });
        };
      }

      const name = document.createElement('span');
      name.innerHTML = item.display_name;

      elem.appendChild(input);
      elem.appendChild(name);
    }

    if (item.item_type === 'group' || item.item_type === 'root' && item.children.length) {
      const children = layer.tree.getChildren() as WebMapLayerItem[];
      const treeBranch = this._createTreeBranch(children.reverse());
      elem.appendChild(treeBranch);
    }
    return elem;
  }

}
