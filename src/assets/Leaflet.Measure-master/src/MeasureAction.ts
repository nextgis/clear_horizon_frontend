import {
  Handler,
  Util,
  DomUtil,
  DomEvent,
  Polygon,
  Polyline,
  CircleMarker,
} from 'leaflet';

import { I18N } from './i18n';
import { getAreaString, getDistance, getDistanceString } from './utils';
import { MeasureLabel } from './MeasureLabel';

import type { Map, LatLng, LeafletMouseEvent } from 'leaflet';
import {
  DirectPath,
  MeasureActionOptions,
  MeasureModel,
  Trail,
} from './interfaces';

export class MeasureAction extends Handler {
  options: MeasureActionOptions = {
    color: '#FF0080',
    model: 'distance',
    messages: I18N['en'],
  };

  private _map: Map;
  private _measureHandler: this;
  private _finished: boolean;
  private _startMove?: boolean;
  private _measurementStarted?: boolean;
  private _lastPoint?: LatLng;
  private _totalDistance = 0;
  private _trail: Trail = { overlays: [], points: [] };
  private _directPath?: DirectPath;
  private _measurePath?: DirectPath;

  constructor(map: Map, options: MeasureActionOptions) {
    super(map);
    this._map = map;
    this._measureHandler = this;
    this._finished = false;
    Util.setOptions(this, options);
  }
  setModel(model: MeasureModel): this {
    this.options.model = model;
    return this;
  }
  addHooks(): void {
    this._activeMeasure();
  }
  removeHooks(): void {
    this._disableMeasure();
  }
  _activeMeasure(): void {
    this._measureHandler._measurementStarted &&
      this._measureHandler._finishMeasure();
    this._measurementStarted ? this._finishMeasure() : this._enableMeasure();
  }
  _onMouseClick(event: LeafletMouseEvent): void {
    const latlng = event.latlng || this._map.mouseEventToLatLng(event as any);
    if (this._lastPoint && latlng.equals(this._lastPoint)) {
      return;
    }
    if (this._trail.points.length > 0) {
      const points = this._trail.points;
      points.push(latlng);
      const length = points.length;
      this._totalDistance += getDistance(
        points[length - 2],
        points[length - 1],
      );
      this._addMeasurePoint(latlng);
      this._addMarker(latlng);
      if (this.options.model !== 'area') {
        this._addLable(
          latlng,
          getDistanceString(this._totalDistance, this.options.messages),
          'leaflet-measure-lable',
        );
      }
    } else {
      this._totalDistance = 0;
      this._addMeasurePoint(latlng);
      this._addMarker(latlng);
      if (this.options.model !== 'area') {
        this._addLable(
          latlng,
          this.options.messages.start,
          'leaflet-measure-lable',
        );
      }
      this._trail.points.push(latlng);
    }
    this._lastPoint = latlng;
    this._startMove = false;
  }
  _onMouseMove(event: LeafletMouseEvent): void {
    const latlng = event.latlng;
    if (this._directPath && this._trail.points.length > 0) {
      if (this._startMove) {
        this._directPath.setLatLngs(this._trail.points.concat(latlng));
      } else {
        this._directPath.setLatLngs([latlng]);
        this._startMove = true;
      }
    }
  }
  _enableMeasure(): void {
    this._trail = {
      overlays: [],
      points: [],
    };
    const map = this._map;
    DomUtil.addClass(map.getContainer(), 'leaflet-measure-map');
    // @ts-ignore
    map.contextMenu && map.contextMenu.disable();
    this._measurementStarted = true;
    map.on('click', this._onMouseClick, this);
    map.on('dblclick', this._finishMeasure, this);
    map.on('contextmenu', this._finishMeasure, this);
    map.doubleClickZoom.disable();
    map.on('mousemove', this._onMouseMove, this);
    map.fire('measure:start');
  }
  _disableMeasure(): void {
    const map = this._map;
    DomUtil.removeClass(map.getContainer(), 'leaflet-measure-map');
    // @ts-ignore
    map.contextMenu && map.contextMenu.enable();
    map.off('click', this._onMouseClick, this);
    map.off('dblclick', this._finishMeasure, this);
    map.off('contextmenu', this._finishMeasure, this);
    map.off('mousemove', this._onMouseMove, this);
    map.doubleClickZoom.enable();
    this._measurementStarted = this._startMove = false;
    if (!this._finished) {
      this._clearOverlay.call(this);
    }
    map.fire('measure:stop');
  }
  _finishMeasure(event?: LeafletMouseEvent): void {
    if (this._trail.points.length > 0) {
      if (this._trail.points.length > 1) {
        if (this._directPath && (!event || event.type === 'contextmenu')) {
          this._directPath.setLatLngs(this._trail.points);
        }
        if (this._lastPoint) {
          if (this.options.model === 'area') {
            this._addLable(
              this._lastPoint,
              getAreaString(this._trail.points, this.options.messages),
              'leaflet-measure-lable',
              true,
            );
          } else {
            this._addLable(
              this._lastPoint,
              getDistanceString(this._totalDistance, this.options.messages),
              'leaflet-measure-lable',
              true,
            );
          }
        }
        this._directPath && this._map.removeLayer(this._directPath);
        this._finished = true;
      } else {
        this._clearOverlay.call(this);
      }
    }
    this.disable();
  }
  _resetDirectPath(latlng: LatLng): void {
    if (!this._directPath) {
      let directPath: DirectPath;
      if (this.options.model === 'area') {
        directPath = new Polygon([latlng], {
          weight: 2,
          color: this.options.color,
          dashArray: [5, 5],
          fillOpacity: 0,
          interactive: false,
        });
      } else {
        const polyline = new Polyline([latlng], {
          weight: 2,
          color: this.options.color,
          dashArray: [5, 5],
          interactive: false,
        });
        directPath = polyline;
      }
      this._map.addLayer(directPath);
      this._trail.overlays.push(directPath);
      this._directPath = directPath;
    } else {
      this._directPath.addLatLng(latlng);
    }
  }
  _addMeasurePoint(latlng: LatLng): void {
    if (!this._measurePath) {
      let measurePath: DirectPath;
      if (this.options.model === 'area') {
        measurePath = new Polygon([latlng], {
          weight: 2,
          color: this.options.color,
          fillColor: this.options.color,
          fillOpacity: 0.5,
          interactive: false,
        });
      } else {
        const polyline = new Polyline([latlng], {
          weight: 2,
          color: this.options.color,
          interactive: false,
        });
        measurePath = polyline;
      }
      this._map.addLayer(measurePath);
      this._trail.overlays.push(measurePath);
      this._measurePath = measurePath;
    } else {
      this._measurePath.addLatLng(latlng);
    }
    this._resetDirectPath(latlng);
  }
  _addMarker(latLng: LatLng): void {
    const marker = new CircleMarker(latLng, {
      color: this.options.color,
      opacity: 1,
      weight: 1,
      fillColor: '#FFFFFF',
      fill: true,
      fillOpacity: 1,
      radius: 3,
      interactive: false,
    });
    this._map.addLayer(marker);
    this._trail.overlays.push(marker);
  }
  _addLable(
    latlng: LatLng,
    content: string,
    className: string,
    ended?: boolean,
  ): void {
    const lable = new MeasureLabel({
      latlng,
      content,
      className,
    });
    this._map.addLayer(lable);
    this._trail.overlays.push(lable);
    if (ended) {
      const closeButton = lable.enableClose();
      DomEvent.on(closeButton, 'click', this._clearOverlay, this);
    }
  }
  _clearOverlay(): void {
    const overlays = this._trail.overlays;
    let i = 0,
      length;
    for (length = overlays.length; i < length; i++) {
      this._map.removeLayer(overlays[i]);
    }
  }
}
