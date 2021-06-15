import { Layer, Point, Util, Browser, DomUtil, latLng } from 'leaflet';

import type { Map, LayerOptions, LatLng, ZoomAnimEvent } from 'leaflet';

export interface MeasureLabelOptions extends LayerOptions {
  offset?: Point;
  latlng: null | LatLng;
  content: string;
  className: string;
}

export class MeasureLabel extends Layer {
  options: MeasureLabelOptions = {
    latlng: null,
    content: '',
    className: '',
  };

  protected _map!: Map;
  private _offset = new Point(0, 30);
  private _container?: HTMLElement;
  private _contentNode?: HTMLElement;
  private _closeButton?: HTMLElement;
  private _containerBottom?: number;
  private _containerLeft?: number;

  constructor(options: MeasureLabelOptions) {
    super(options);
    Util.setOptions(this, options);
    if (this.options.offset) {
      this._offset = this.options.offset;
    }
  }
  onAdd(map: Map): this {
    this._map = map;
    this._container || this._initLayout();
    if (this._container) {
      map.getPanes().popupPane.appendChild(this._container);
    }
    map.on('viewreset', this._updatePosition, this);
    if (Browser.any3d) {
      map.on('zoomanim', this._zoomAnimation, this);
    }
    this._update();
    return this;
  }
  addTo(map: Map): this {
    map.addLayer(this);
    return this;
  }
  onRemove(map: Map): this {
    if (this._container) {
      map.getPanes().popupPane.removeChild(this._container);
    }
    map.off('viewreset', this._updatePosition, this);
    map.off('zoomanim', this._zoomAnimation, this);
    (this._map as any) = null;
    return this;
  }
  setLatLng(latlng: LatLng): this {
    this.options.latlng = latLng(latlng);
    this._updatePosition();
    return this;
  }
  setContent(content: string): this {
    this.options.content = content;
    this._updateContent();
    return this;
  }
  enableClose(): HTMLElement {
    this._closeButton = DomUtil.create('span', 'close', this._container);
    this._closeButton.innerHTML =
      '<svg class="icon" viewBox="0 0 40 40"><path stroke="#FF0000" stroke-width="3" d="M 10,10 L 30,30 M 30,10 L 10,30" /></svg>';
    return this._closeButton;
  }
  private _initLayout(): void {
    this._container = DomUtil.create('div', this.options.className);
    this._contentNode = DomUtil.create('div', 'content', this._container);
  }
  private _update(): void {
    this._map && (this._updateContent(), this._updatePosition());
  }
  private _updateContent(): void {
    if (this._contentNode && this.options.content) {
      if (typeof this.options.content == 'string') {
        this._contentNode.innerHTML = this.options.content;
      } else {
        this._contentNode.innerHTML = '';
        this._contentNode.appendChild(this.options.content);
      }
    }
  }
  private _updatePosition(): void {
    if (this.options.latlng && this._container) {
      const point = this._map.latLngToLayerPoint(this.options.latlng);
      const is3D = Browser.any3d;
      const offset = this._offset;
      is3D && DomUtil.setPosition(this._container, point);
      this._containerBottom = -offset.y - (is3D ? 0 : point.y);
      this._containerLeft = offset.x + (is3D ? 0 : point.x);
      this._container.style.bottom = this._containerBottom + 'px';
      this._container.style.left = this._containerLeft + 'px';
    }
  }
  private _zoomAnimation(a: ZoomAnimEvent): void {
    if (this._container) {
      const point = (this._map as any)._latLngToNewLayerPoint(
        this.options.latlng,
        a.zoom,
        a.center,
      ) as Point;
      DomUtil.setPosition(this._container, point);
    }
  }
}
