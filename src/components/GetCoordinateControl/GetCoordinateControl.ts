import './GetCoordinateControl.css';
import '../ToggleControl.css';
import { EventEmitter } from 'events';

import { Clipboard } from '@nextgis/utils';

import type { ActionMap } from '../ActionMap';
import type {
  MapClickEvent,
  ToggleControlOptions,
  VectorLayerAdapter,
} from '@nextgis/ngw-map';
import type { Feature, Point } from 'geojson';

export interface GetCoordinatePanelControlOptions {
  toggle?: (status: boolean) => void;
}

export class GetCoordinatePanelControl implements ToggleControlOptions {
  html = '<i class="fas fa-map-pin btn-control-icon "></i>';
  title = {
    off: 'Полученить координаты с карты',
    on: 'Выключить режим получения координат с карты',
  };

  addClass = 'toggle-control webmap-tree-control';
  addClassOn = 'active';

  status = false;

  emitter = new EventEmitter();

  private _toggle?: (status: boolean) => void;
  private __onMapClick?: (e: MapClickEvent) => void;
  private _layer!: VectorLayerAdapter;

  constructor(
    private actionMap: ActionMap,
    options: GetCoordinatePanelControlOptions = {},
  ) {
    this._toggle = options.toggle;
    this.actionMap.ngwMap
      .addFeatureLayer<any, Point>({
        id: 'show-coordinate-click',
        visibility: true,
        paint: { radius: 6 },
        popup: true,
        popupOptions: {
          createPopupContent: (d) => {
            if (d.feature) {
              return this._createPopupContent(
                d.feature.geometry.coordinates.map((x) => x.toFixed(5)),
              );
            }
          },
        },
      })
      .then((layer) => {
        if (layer) {
          this._layer = layer;
        }
      });
  }

  onClick(status?: boolean): void {
    this.toggleControl(status);
  }

  show(): void {
    this.actionMap.ngwMap.setCursor('crosshair');
    this._removeClickListener();
    this.__onMapClick = (e: MapClickEvent) => this._onMapClick(e);
    this.actionMap.ngwMap.emitter.on('click', this.__onMapClick);
  }

  hide(): void {
    this.actionMap.ngwMap.setCursor('default');
    this._removeClickListener();
    this.actionMap.ngwMap.clearLayerData(this._layer);
  }

  private _removeClickListener() {
    if (this.__onMapClick) {
      this.actionMap.ngwMap.emitter.off('click', this.__onMapClick);
      this.__onMapClick = undefined;
    }
  }

  private _onMapClick(e: MapClickEvent) {
    const feature: Feature<Point> = {
      type: 'Feature',
      properties: {},
      geometry: { type: 'Point', coordinates: e.lngLat },
    };
    this.actionMap.ngwMap.setLayerData(this._layer, feature);
  }

  private toggleControl(status?: boolean) {
    status = status !== undefined ? status : !this.status;
    if (status) {
      this.show();
    } else {
      this.hide();
    }

    this.status = status;
    if (this._toggle) {
      this._toggle(status);
    }
    this.emitter.emit('status', this.status);
  }

  private _createPopupContent([lng, lat]: string[]) {
    const content = document.createElement('div');
    const latLngStr = `${lat}, ${lng}`;
    content.innerHTML = `
    <span>Широта/Долгота:</span>
    <span class="lat-lng-coord"> ${latLngStr}</span>
    <a href="#" class="copy-to-clipboard">
    <i class="far fa-clipboard"></i>
    </a>`;
    const clipBoardLink = content.getElementsByClassName(
      'copy-to-clipboard',
    )[0] as HTMLLinkElement;
    clipBoardLink.onclick = () => {
      Clipboard.copy(latLngStr);
    };

    return content;
  }
}
