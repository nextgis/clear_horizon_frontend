import './FiresContainer.css';

import { defined } from '@nextgis/utils';

import type { FireResource } from 'src/App';
import type { LayerAdapter, NgwMap } from '@nextgis/ngw-map';
import type { CirclePaint } from '@nextgis/paint';
import type { ResourceAdapter, NgwLayerOptions } from '@nextgis/ngw-kit';

export interface FiresContainerOptions {
  ngwMap: NgwMap;
  fires: NgwLayerOptions<'GEOJSON'>[];
}

export class UserFiresContainer {
  protected readonly ngwMap: NgwMap;
  protected _container: HTMLElement;

  constructor(protected options: FiresContainerOptions) {
    this.ngwMap = options.ngwMap;
    this._container = this._createContainer();
  }

  getContainer(): HTMLElement {
    return this._container;
  }

  _createContainer(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'fires-contentainer panel-content-padding ';

    const fires = document.createElement('div');
    fires.className = 'fires-contentainer__layers';
    this.options.fires.forEach((f) => {
      this._createFireItem(f, fires);
    });
    container.appendChild(fires);

    return container;
  }

  _createFireItem(fire: FireResource, container: HTMLElement): void {
    const elem = document.createElement('div');
    elem.className = 'tree-container__item';
    const id = fire.id;
    if (!defined(id)) return;

    const createItem = (layer_: ResourceAdapter): void => {
      const item = layer_.item;

      if (item) {
        const input = document.createElement('input');
        input.setAttribute('type', 'checkbox');

        input.checked = true;

        // visibility.emitter.on('change', (ev: CheckChangeEvent) => {
        //   input.checked = ev.value;
        // });
        input.onclick = () => {
          this.ngwMap.toggleLayer(id, input.checked);
        };

        const name = document.createElement('span');
        const displayName = item.resource.display_name.split('__')[0];
        name.innerHTML = displayName.replace('fires', '').trim();
        const symbol = this._createSymbol(fire);
        elem.appendChild(input);
        elem.appendChild(symbol);
        elem.appendChild(name);
        container.appendChild(elem);
      }
    };

    const layer = this.ngwMap.getLayer(id) as ResourceAdapter;
    if (layer) {
      createItem(layer);
    } else {
      const onLayerAdd = (e: LayerAdapter) => {
        if (e.id === id) {
          createItem(e as ResourceAdapter);
          this.ngwMap.emitter.off('layer:add', onLayerAdd);
        }
      };
      this.ngwMap.emitter.on('layer:add', onLayerAdd);
    }
  }

  _createSymbol(fire: FireResource): HTMLElement {
    const symbol = document.createElement('span');
    symbol.className = 'item-symbol';
    const color = (fire.adapterOptions?.paint as CirclePaint).color;
    if (typeof color === 'string') {
      symbol.style.color = color;
      symbol.style.borderColor = color;
      symbol.style.backgroundColor = color;
    }
    return symbol;
  }
}
