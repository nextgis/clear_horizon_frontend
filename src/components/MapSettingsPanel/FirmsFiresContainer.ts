import './FiresContainer.css';

import { defined } from '@nextgis/utils';
import { VectorResourceAdapter } from '@nextgis/ngw-kit';
import { LayersContainer } from './LayersContainer';

const SELECT = [
  ['24', '24 часа'],
  ['48', '48 часов'],
  ['72', '72 часа'],
  ['168', 'неделя'],
];

export class FirmsFiresContainer extends LayersContainer {
  _createContainer(): HTMLElement {
    const container = super._createContainer();

    const selector = this._createSelector();
    container.insertBefore(selector, container.firstChild);

    return container;
  }

  private _createSelector() {
    const elem = document.createElement('div');
    const label = document.createElement('label');

    label.appendChild(document.createTextNode('Просмотр термоточек: '));
    const selector = document.createElement('select');

    SELECT.forEach((x) => {
      const option = document.createElement('option');
      option.value = x[0];
      option.text = x[1];
      selector.appendChild(option);
    });

    selector.onchange = () => {
      this.options.layers.forEach((x) => {
        const id = x.id;
        if (defined(id)) {
          const layer = this.ngwMap.getLayer(id) as VectorResourceAdapter;
          if (layer.propertiesFilter) {
            layer.propertiesFilter([
              [
                'timestamp',
                'ge',
                Math.floor(Date.now() / 1000) - Number(selector.value) * 3600,
              ],
            ]);
          }
        }
      });
    };

    label.appendChild(selector);
    elem.appendChild(label);
    return elem;
  }
}
