import './BaseMapsContainer.css';

import NgwMap, { LayerAdapter } from '@nextgis/ngw-map';

export interface BaseMapsContainerOptions {
  ngwMap: NgwMap;
}

export class BaseMapsContainer {
  private readonly ngwMap: NgwMap;
  private _container: HTMLElement;
  private _baseMapsContainer: HTMLElement;

  constructor(private options: BaseMapsContainerOptions) {
    this.ngwMap = options.ngwMap;
    this._container = this._createContainer();
    this.ngwMap.emitter.on('layer:add', (e) => {
      if (this.ngwMap.isBaseLayer(e)) {
        this._updateBaseMapContainer();
      }
    });
  }

  getContainer() {
    return this._container;
  }

  private _createContainer() {
    const container = document.createElement('div');
    container.className = 'basemaps-contentainer panel-content-padding control';

    const basemaps = document.createElement('div');
    basemaps.className = 'basemaps-contentainer__layers';
    this._baseMapsContainer = basemaps;
    container.appendChild(basemaps);
    this._updateBaseMapContainer();
    return container;
  }

  private _updateBaseMapContainer() {
    this._baseMapsContainer.innerHTML = '';
    // first checkbox to remove any basemap
    this._createBaseMapItem();
    this.ngwMap.getBaseLayers().forEach((x) => {
      const layer = this.ngwMap.getLayer(x);
      if (layer) {
        this._createBaseMapItem(layer);
      }
    });
  }

  private _createBaseMapItem(baseMap?: LayerAdapter) {
    const control = document.createElement('div');
    control.className = 'control';
    const elem = document.createElement('label');
    elem.className = 'radio basemap-container__item';

    const input = document.createElement('input');
    input.setAttribute('type', 'radio');
    input.setAttribute('name', 'basemap');

    input.checked = this.ngwMap.isLayerVisible(baseMap);

    // visibility.emitter.on('change', (ev: CheckChangeEvent) => {
    //   input.checked = ev.value;
    // });
    input.onclick = () => {
      if (baseMap) {
        this.ngwMap.toggleLayer(baseMap.id, input.checked);
      } else {
        this.ngwMap.hideLayer(this.ngwMap.getActiveBaseLayer());
      }
    };
    const layerName = baseMap && (baseMap.name || baseMap.options.name);
    const displayName = layerName || 'Blank';
    const name = document.createTextNode(displayName);

    elem.appendChild(input);

    elem.appendChild(name);

    control.appendChild(elem);

    this._baseMapsContainer.appendChild(control);
  }
}
