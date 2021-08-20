import 'leaflet/dist/leaflet.css';
// import 'ol/ol.css';
import './ActionMap.css';

// @ts-ignore
import ShareButtons from 'share-buttons/dist/share-buttons';

import {
  NgwMap,
  NgwLayers,
  LocationEvent,
  ToggleControl,
  VectorAdapterOptions,
  NgwIdentifyEvent,
} from '@nextgis/ngw-map';
import { CirclePaint } from '@nextgis/paint';
import { NgwLayerOptions } from '@nextgis/ngw-kit';
import { getIcon } from '@nextgis/icons';
import MapAdapter from '@nextgis/leaflet-map-adapter';
// import MapAdapter from '@nextgis/ol-map-adapter';
import UrlRuntimeParams from '@nextgis/url-runtime-params';
import { QmsAdapterOptions } from '@nextgis/qms-kit';
import CancelablePromise from '@nextgis/cancelable-promise';
import { ResourceHierarchy } from '@nextgis/ngw-connector';

import { Popup } from './Popup';
import { MapSettingsPanel } from './MapSettingsPanel/MapSettingsPanel';
import { GetCoordinatePanelControl } from './GetCoordinateControl/GetCoordinateControl';
import { createMeasureControl } from './createMeasureControl';
import { addStopToggleControl, stopToggleControlsFor } from './ToggleControl';
import { daysBehindFilter } from '../utils/daysBehindRange';

import { NOW } from '../constants';

import type { Control, Map, Layer } from 'leaflet';
import type {
  AppOptions,
  FiresAdapterOptions,
  FirmsLayerOptions,
  SensorLayerOptions,
  UserFiresLayerOptions,
} from '../interfaces';

export class ActionMap {
  ngwMap!: NgwMap<Map, Layer, any>;

  tree?: MapSettingsPanel;
  treeControl?: Control & ToggleControl;

  authControl?: Control & ToggleControl;
  popup: Popup;

  private _promises: { [name: string]: CancelablePromise<any> } = {};

  constructor(public options: Partial<AppOptions>) {
    this.popup = new Popup();
  }

  async create(opt: Partial<AppOptions>): Promise<void> {
    // const auth = new Auth(opt.mapOptions);
    const mapOpt = { ...opt.mapOptions };
    // try {
    //   await auth.login();
    //   mapOpt.connector = auth.connector;
    // } catch (er) {
    //   // cancel login
    // }

    const { basemaps, firms, userFires, sensors } = opt;

    const ngwMap = new NgwMap<Map, Layer>({
      mapAdapter: new MapAdapter(),
      controls: [],
      minZoom: 4,
      runtimeParams: [new UrlRuntimeParams()],
      ...mapOpt,
    });

    this.ngwMap = ngwMap;

    ngwMap.setCursor('default');
    this.popup.setNgwMap(ngwMap);

    if (basemaps) {
      ngwMap.onLoad().then(() =>
        basemaps.forEach((x, i) => {
          ngwMap.addBaseLayer<any, QmsAdapterOptions>('QMS', {
            ...x,
            visibility: i === 0,
          });
        }),
      );
    }
    ngwMap.getPaintFunctions = { base: getIcon };

    ngwMap.addControl('ZOOM', 'top-left');
    this._createLocateControl();
    ngwMap.addControl('ATTRIBUTION', 'bottom-right', {
      customAttribution: [
        '<a href="https://nextgis.com" target="_blank">©NextGIS</a>',
      ],
    });
    createMeasureControl(ngwMap);
    this._createShareControl();
    // await this._createAuthControl(auth);
    // this.ngwMap.addControl(this.authControl, 'top-right');

    const ngwLayers = await ngwMap.getNgwLayers();
    const bookmarks: ResourceHierarchy[] = [];
    Object.values(ngwLayers).forEach((x) => {
      const bookmark =
        x.layer.item &&
        x.layer.item.webmap &&
        x.layer.item.webmap.bookmark_resource;
      if (bookmark) {
        bookmarks.push(bookmark);
      }
    });

    await this._addFireLayer(opt.userFires);
    await this._addFirms(opt.firms);
    await this._addSensors(opt.sensors);
    this._createGetCoordinateControl();

    this._addTreeControl({
      ngwLayers,
      firms,
      sensors,
      userFires,
      bookmarks,
    });

    this._addEventsListeners();
  }

  private _locate() {
    const locationfound = (e: LocationEvent) => {
      const lngLat = e.lngLat;
      this.ngwMap.setCenter(lngLat);
    };

    this.ngwMap.locate({ setView: false }, { locationfound });
  }

  // private async _createAuthControl(auth: Auth) {
  //   const authBtn = document.getElementsByClassName(
  //     'js-auth-btn',
  //   )[0] as HTMLElement;
  //   const getStatus = () => {
  //     return !!(this.ngwMap.connector && this.ngwMap.connector.user);
  //   };
  //   const onClick = () => {
  //     auth.logout();
  //     window.location.reload();
  //   };
  //   authBtn.innerHTML = getStatus() ? 'Выйти' : 'Войти';
  //   authBtn.style.display = 'block';
  //   authBtn.addEventListener('click', onClick);
  // }

  private _createShareControl() {
    const shareModal = document.getElementsByClassName('js-modal')[0];
    const closeModalBtn = document.getElementsByClassName('js-modal-close')[0];
    const shareModalContent = document.getElementsByClassName(
      'js-share-modal-content',
    )[0];
    const shareInput = document.getElementsByClassName(
      'js-share-input',
    )[0] as HTMLInputElement;
    const showModal = () => {
      const href = location.href;
      const html = this._createShareModalContent(href);
      shareInput.value = href;
      shareModalContent.innerHTML = html;
      ShareButtons.update();
      shareModal.classList.add('is-active');
    };
    const closeModal = () => {
      shareModalContent.innerHTML = '';
      shareModal.classList.remove('is-active');
    };
    closeModalBtn.addEventListener('click', () => {
      closeModal();
    });

    const shareControl = this.ngwMap.createButtonControl({
      html: '<i class="fas fa-share-alt btn-control-icon "></i>',
      onClick() {
        showModal();
      },
    });
    this.ngwMap.addControl(shareControl, 'bottom-right');
  }

  private async _createGetCoordinateControl() {
    const control = new GetCoordinatePanelControl(this, {
      toggle: (status) => {
        if (status) {
          stopToggleControlsFor('coordinate');
          this.ngwMap.disableSelection();
        } else {
          this.ngwMap.enableSelection();
        }
      },
    });
    const toggleControl = await this.ngwMap.createToggleControl(control);
    this.ngwMap.addControl(toggleControl, 'top-left');
    addStopToggleControl('coordinate', () => toggleControl.onClick(false));
  }

  private _createLocateControl() {
    const onClick = () => this._locate();
    const locateControl = this.ngwMap.createButtonControl({
      html: '<i class="fas fa-location-arrow btn-control-icon"></i>',
      title: 'Найти меня на карте',
      onClick,
    });
    this.ngwMap.addControl(locateControl, 'top-left');
  }

  private _createShareModalContent(url: string) {
    const social = [
      { id: 'tw', name: 'Twitter', icon: 'fab fa-twitter' },
      { id: 'vk', name: 'VK', icon: 'fab fa-vk' },
      { id: 'fb', name: 'Facebook', icon: 'fab fa-facebook-square' },
    ];

    const html = `<div class="buttons share-btn js-share-btn" data-url="${url}" data-title="" data-desc="">
      ${social
        .map(
          (x) => `<a class="button is-primary" data-id="${x.id}">
                    <span class="icon">
                        <i class="${x.icon}"></i>
                    </span>
                    <span>${x.name}</span>
                </a>`,
        )
        .join('')}
    </div>`;
    return html;
  }

  private async _addFireLayer(
    x?: NgwLayerOptions<'GEOJSON'>,
    adapterOptions?: VectorAdapterOptions,
  ) {
    if (x) {
      const paint =
        x.adapterOptions && x.adapterOptions.paint
          ? (x.adapterOptions.paint as CirclePaint)
          : {};
      return this.ngwMap.addNgwLayer({
        resource: x.resource,
        id: x.id,
        adapterOptions: {
          ...x.adapterOptions,
          paint: {
            ...paint,
            radius: 5,
          },
          selectable: true,
          selectedPaint: {
            ...paint,
            radius: 7,
          },
          ...adapterOptions,
          propertiesFilter: daysBehindFilter(
            this.options.timedelta || 24,
            x.adapterOptions as FiresAdapterOptions,
            NOW,
          ),
        },
      });
    }
  }

  private async _addFirms(fires?: FirmsLayerOptions[]) {
    if (fires) {
      for (const x of fires) {
        await this._addFireLayer(x);
      }
    }
  }

  private async _addSensors(sensor?: SensorLayerOptions) {
    return sensor && this.ngwMap.addNgwLayer(sensor);
  }

  private async _addTreeControl(opt: {
    ngwLayers: NgwLayers;
    firms?: FirmsLayerOptions[];
    userFires?: UserFiresLayerOptions;
    sensors?: SensorLayerOptions;
    bookmarks?: ResourceHierarchy[];
  }) {
    const sidebarToggleBtn = document.getElementsByClassName('js-sidebar')[0];

    const isActive = () => sidebarToggleBtn.classList.contains('is-active');
    const activateBurger = () => sidebarToggleBtn.classList.add('is-active');
    const deactivateBurger = () =>
      sidebarToggleBtn.classList.remove('is-active');

    await this.ngwMap.onLoad();

    this.tree = new MapSettingsPanel(this, {
      ...opt,
      onDateChange: () => {
        this._cleanSelection();
      },
      ngwMap: this.ngwMap,
    });

    const toggle = (status?: boolean) => {
      status = status !== undefined ? status : isActive();
      if (status) {
        stopToggleControlsFor('tree');
        this.tree && this.tree.show();
        activateBurger();
      } else {
        this.tree && this.tree.hide();
        deactivateBurger();
      }
    };
    sidebarToggleBtn.addEventListener('click', () => {
      toggle();
    });
    setTimeout(() => {
      toggle();
    }, 500);
    addStopToggleControl('tree', () => toggle(false));
  }

  private _cleanSelection() {
    if (
      this._promises.getFeaturePromise &&
      this._promises.getFeaturePromise.cancel
    ) {
      this._promises.getFeaturePromise.cancel();
    }
    this.ngwMap.removeLayer('highlight');
  }

  private _highlighNgwLayer(e: NgwIdentifyEvent) {
    this._cleanSelection();
    const paramsList = e.getIdentifyItems();
    const paramsLast = paramsList[paramsList.length - 1];
    if (paramsLast) {
      // const resourceId = params.resourceId;
      paramsLast.identify().then((item) => {
        if (item) {
          item.toGeojson().then((geojson) => {
            this.ngwMap.addLayer('GEOJSON', {
              id: 'highlight',
              data: geojson,
              visibility: true,
              paint: { color: 'green', stroke: true, fillOpacity: '0.8' },
              popup: true,
              popupOptions: {
                createPopupContent: (e) => {
                  e.onClose(() => {
                    this._cleanSelection();
                    this.ngwMap.unSelectLayers();
                  });
                  if (e.feature) {
                    const element = this.popup.createPopupContent(
                      geojson,
                      paramsLast.layerId,
                      item.extensions.attachment,
                    );

                    return element;
                  }
                },
              },
            });
          });
        }
      });
    }
  }

  private _addEventsListeners() {
    this.ngwMap.emitter.on('click', () => {
      this.ngwMap.cancelPromises('identify', 'select');
    });
    this.ngwMap.emitter.on('ngw:select', (e) => e && this._highlighNgwLayer(e));
  }
}
