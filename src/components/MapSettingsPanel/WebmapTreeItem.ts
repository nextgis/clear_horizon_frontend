import { WebMap } from '@nextgis/webmap';

import type { ChangeEvent, CheckProperty } from '@nextgis/item';
import type { NgwWebmapItem, TreeGroup, TreeLayer } from '@nextgis/ngw-kit';

export class WebmapTreeItem {
  private _container?: HTMLElement;

  constructor(layer: NgwWebmapItem) {
    const container = this._createTreeItem(layer);
    if (container) {
      this._container = container;
    }
  }

  getContainer(): HTMLElement | undefined {
    return this._container;
  }

  private _createTreeBranch(layers: NgwWebmapItem[]) {
    const elem = document.createElement('div');
    elem.className = 'tree-container__item-children';
    layers.forEach((x) => {
      if (x.item) {
        const item = this._createTreeItem(x);
        if (item) {
          elem.appendChild(item);
        }
      }
    });
    return elem;
  }

  private _createTreeItem(layer: NgwWebmapItem) {
    const item: TreeGroup | TreeLayer = layer.item;
    if (!item) {
      return false;
    }
    const elem = document.createElement('div');
    elem.className = 'tree-container__item';
    if (item.display_name) {
      const input = document.createElement('input');
      input.setAttribute('type', 'checkbox');
      // const value = item.item_type === 'layer' ? item.layer_enabled : true;
      const visibility = layer.properties.property(
        'visibility',
      ) as CheckProperty;
      input.checked = !!visibility.get();

      if (visibility) {
        visibility.emitter.on('change', (ev: ChangeEvent) => {
          input.checked = ev.value;
        });
        input.onclick = () => {
          visibility.set(input.checked, {
            propagation: WebMap.keys.pressed('ctrl'),
          });
        };
      }

      const name = document.createElement('span');
      name.innerHTML = item.display_name;

      elem.appendChild(input);
      elem.appendChild(name);
    }

    if (
      item.item_type === 'group' ||
      (item.item_type === 'root' && item.children.length)
    ) {
      const children = layer.tree.getChildren() as NgwWebmapItem[];
      const treeBranch = this._createTreeBranch(children.reverse());
      elem.appendChild(treeBranch);
    }
    return elem;
  }
}
