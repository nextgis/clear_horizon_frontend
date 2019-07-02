import WebMap from '@nextgis/webmap';
import { CheckProperty, CheckChangeEvent } from '@nextgis/item';
import { WebMapLayerItem, TreeGroup, TreeLayer } from '@nextgis/ngw-kit';

export class WebmapTreeItem {

  private _container?: HTMLElement;

  constructor(layer: WebMapLayerItem) {
    const container = this._createTreeItem(layer);
    if (container) {
      this._container = container;
    }
  }

  getContainer() {
    return this._container;
  }

  private _createTreeBranch(layers: WebMapLayerItem[]) {
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

  private _createTreeItem(layer: WebMapLayerItem) {
    const item: TreeGroup | TreeLayer = layer.item;
    if (!item) {
      return false;
    }
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
