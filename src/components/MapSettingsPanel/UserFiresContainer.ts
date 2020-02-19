import './FiresContainer.css';

import { FireResource } from 'src/App';
import NgwMap, { CirclePaint } from '@nextgis/ngw-map';
import { ResourceAdapter, NgwLayerOptions } from '@nextgis/ngw-kit';

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

  getContainer() {
    return this._container;
  }

  _createContainer() {
    const container = document.createElement('div');
    container.className = 'fires-contentainer panel-content-padding ';

    const fires = document.createElement('div');
    fires.className = 'fires-contentainer__layers';
    this.options.fires.forEach(f => {
      this._createFireItem(f, fires);
    });
    container.appendChild(fires);

    return container;
  }

  _createFireItem(fire: FireResource, container: HTMLElement) {
    const elem = document.createElement('div');
    elem.className = 'tree-container__item';
    const layer = this.ngwMap.getLayer(fire.id) as ResourceAdapter;
    const item = layer.item;
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');

    input.checked = true;

    // visibility.emitter.on('change', (ev: CheckChangeEvent) => {
    //   input.checked = ev.value;
    // });
    input.onclick = () => {
      this.ngwMap.toggleLayer(fire.id, input.checked);
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

  _createSymbol(fire: FireResource) {
    const symbol = document.createElement('span');
    symbol.className = 'item-symbol';
    const color = (fire.adapterOptions?.paint as CirclePaint).color;
    symbol.style.color = color;
    symbol.style.borderColor = color;
    symbol.style.backgroundColor = color;
    return symbol;
  }
}
