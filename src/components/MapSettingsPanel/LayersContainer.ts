import './FiresContainer.css';

import { defined } from '@nextgis/utils';

import type { FireResource } from '../../interfaces';
import type { NgwLayerOptions, ResourceAdapter } from '@nextgis/ngw-kit';
import type { LayerAdapter, NgwMap } from '@nextgis/ngw-map';
import type { CirclePaint } from '@nextgis/paint';

export interface LayersContainerOptions {
  ngwMap: NgwMap;
  layers: NgwLayerOptions<'GEOJSON'>[];
}

export class LayersContainer<
  O extends LayersContainerOptions = LayersContainerOptions,
> {
  protected readonly ngwMap: NgwMap;
  protected _container: HTMLElement;

  constructor(protected options: O) {
    this.ngwMap = options.ngwMap;
    this._container = this._createContainer();
  }

  getContainer(): HTMLElement {
    return this._container;
  }

  protected _createContainer(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'fires-contentainer panel-content-padding ';

    const firesEl = document.createElement('div');
    firesEl.className = 'fires-contentainer__layers';
    for (const f of this.options.layers) {
      this._createFireItem(f, firesEl);
    }
    container.appendChild(firesEl);

    return container;
  }

  protected onLayerAdd(id: string, cb: (layer: ResourceAdapter) => void): void {
    const ngwMap = this.options.ngwMap;
    const layer = ngwMap && (ngwMap.getLayer(id) as ResourceAdapter);
    if (layer) {
      cb(layer);
    } else {
      const onLayerAdd = (e: LayerAdapter) => {
        if (e.id === id) {
          cb(e as ResourceAdapter);
          this.ngwMap.emitter.off('layer:add', onLayerAdd);
        }
      };
      this.ngwMap.emitter.on('layer:add', onLayerAdd);
    }
  }

  private _createFireItem(fire: FireResource, container: HTMLElement): void {
    const elem = document.createElement('div');
    elem.className = 'tree-container__item';
    const id = fire.id;
    if (!defined(id)) return;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = 'загрузка...';
    container.appendChild(wrapper);

    const createItem = (layer_: ResourceAdapter): void => {
      const item = layer_.item;
      wrapper.innerHTML = '';
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
        wrapper.appendChild(elem);
      }
    };
    this.onLayerAdd(id, (layer) => createItem(layer));
  }

  private _createSymbol(fire: FireResource): HTMLElement {
    const symbol = document.createElement('span');
    symbol.className = 'item-symbol';
    if (fire.adapterOptions?.paint) {
      const { color, stroke, strokeColor } = fire.adapterOptions
        ?.paint as CirclePaint;
      if (typeof color === 'string') {
        symbol.style.color = color;
        symbol.style.backgroundColor = color;
      }
      if (stroke && typeof strokeColor === 'string') {
        symbol.style.borderColor = strokeColor;
      }
    }
    return symbol;
  }
}
