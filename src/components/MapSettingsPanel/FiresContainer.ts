import './FiresContainer.css';

import { FireResource } from 'src/App';
import NgwMap from '@nextgis/ngw-map';
import { ResourceAdapter, VectorResourceAdapter } from '@nextgis/ngw-kit';

export interface FiresContainerOptions {
  ngwMap: NgwMap;
  fires: FireResource[];
}

export class FiresContainer {
  private readonly ngwMap: NgwMap;
  private _container: HTMLElement;

  private _select = [['24', '24 часа'], ['48', '48 часов'], ['72', '72 часа'], ['168', 'неделя']];

  constructor(private options: FiresContainerOptions) {
    this.ngwMap = options.ngwMap;
    this._container = this._createContainer();
  }

  getContainer() {
    return this._container;
  }

  _createContainer() {
    const container = document.createElement('div');
    container.className = 'fires-contentainer panel-content-padding ';

    const selector = this._createSelector();
    container.appendChild(selector);

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

    symbol.style.color = fire.color;
    symbol.style.borderColor = fire.color;
    symbol.style.backgroundColor = fire.color;
    return symbol;
  }

  _createSelector() {
    const elem = document.createElement('div');
    const label = document.createElement('label');

    label.appendChild(document.createTextNode('Просмотр термоточек за: '));
    const selector = document.createElement('select');

    this._select.forEach(x => {
      const option = document.createElement('option');
      option.value = x[0];
      option.text = x[1];
      selector.appendChild(option);
    });

    selector.onchange = () => {
      this.options.fires.forEach(x => {
        const layer = this.ngwMap.getLayer(x.id) as VectorResourceAdapter;
        layer.propertiesFilter([
          ['timestamp', 'ge', Math.floor(Date.now() / 1000) - Number(selector.value) * 3600]
        ]);
      });
    };

    label.appendChild(selector);
    elem.appendChild(label);
    return elem;
  }
}
