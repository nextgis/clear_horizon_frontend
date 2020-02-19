import 'leaflet/dist/leaflet.css';
import 'bulma-carousel/dist/css/bulma-carousel.min.css';
import './ActionMap.css';

import ShareButtons from 'share-buttons/dist/share-buttons';
import PolylineMeasure from 'leaflet.polylinemeasure';

import { Feature, MultiPoint } from 'geojson';
import NgwMap, {
  ToggleControl,
  NgwLayers,
  LocationEvent,
  CirclePaint,
  VectorAdapterOptions
} from '@nextgis/ngw-map';
import NgwKit, { NgwIdentify, NgwLayerOptions } from '@nextgis/ngw-kit';
import { getIcon } from '@nextgis/icons';
import MapAdapter from '@nextgis/leaflet-map-adapter';
import UrlRuntimeParams from '@nextgis/url-runtime-params';
import { QmsAdapterOptions } from '@nextgis/qms-kit';

// import MapAdapter from '@nextgis/ol-map-adapter';
// import 'ol/ol.css';

import { AppOptions } from '../App';
import { Auth } from './Auth/Auth';
import { CancelablePromise, ResourceHierarchy } from '@nextgis/ngw-connector';
import { Popup } from './Popup';
import { MapSettingsPanel } from './MapSettingsPanel/MapSettingsPanel';
import { GetCoordinatePanelControl } from './GetCoordinateControl/GetCoordinateControl';

interface Firms {
  acq_date: string;
  acq_time: string; // '09:06';
  bright_t31?: number;
  brightness?: number;
  confidence: string;
  daynight: 'D';
  frp: number;
  latitude: number;
  longitude: number;
  satellite: 'N';
  scan: number;
  track: number;
  version: string;
}

export class ActionMap {
  ngwMap: NgwMap<L.Map, L.Layer, any>;

  tree?: MapSettingsPanel;
  treeControl?: L.Control & ToggleControl;

  authControl?: L.Control & ToggleControl;
  popup: Popup;

  private _promises: { [name: string]: CancelablePromise<any> } = {};

  private _stopToggleControlsCb: Array<{ name: string; stop: () => void }> = [];

  constructor(private options: AppOptions) {
    this.popup = new Popup(this.ngwMap);
  }

  async create(opt: AppOptions) {
    const auth = new Auth(opt.mapOptions);
    const mapOpt = { ...opt.mapOptions };
    try {
      await auth.login();
      mapOpt.connector = auth.connector;
    } catch (er) {
      // cancel login
    }
    this.ngwMap = new NgwMap(new MapAdapter(), {
      controls: [],
      minZoom: 4,
      runtimeParams: [new UrlRuntimeParams()],
      ...mapOpt
    });
    this.ngwMap.setCursor('default');
    this.popup.setNgwMap(this.ngwMap);
    if (opt.basemaps) {
      this.ngwMap.onLoad().then(() =>
        opt.basemaps.forEach((x, i) => {
          this.ngwMap.addBaseLayer<any, QmsAdapterOptions>('QMS', {
            ...x,
            visibility: i === 0
          });
        })
      );
    }
    this.ngwMap.getPaintFunctions = { base: getIcon };

    this.ngwMap.addControl('ZOOM', 'top-left');
    this._createLocateControl();
    this.ngwMap.addControl('ATTRIBUTION', 'bottom-right');
    this._createShareControl();
    await this._createAuthControl(auth);
    // this.ngwMap.addControl(this.authControl, 'top-right');

    const ngwLayers = await this.ngwMap.getNgwLayers();
    const bookmarks: ResourceHierarchy[] = [];
    Object.values(ngwLayers).forEach(x => {
      const bookmark =
        x.layer.item &&
        x.layer.item.webmap &&
        x.layer.item.webmap.bookmark_resource;
      if (bookmark) {
        bookmarks.push(bookmark);
      }
    });
    await this._addUserFires(opt.userFires);
    await this._addFires(opt.fires);
    this._createGetCoordinateControl();
    this._addTreeControl({
      ngwLayers,
      fires: opt.fires,
      userFires: opt.userFires,
      bookmarks
    });
    this.ngwMap.addControl(this._crateMeasureControl(), 'top-left');

    this._addEventsListeners();
  }

  private _locate() {
    const locationfound = (e: LocationEvent) => {
      const lngLat = e.lngLat;
      // const lngLat: [number, number] = [40, 46];
      // TODO: get extent from webmap or frame layer;
      // const extent = this.ngwMap.getBounds();
      // if (extent) {
      //   const [minLng, minLat, maxLng, maxLat] = extent;
      //   const [lng, lat] = lngLat;
      //   const isLngInBbox = minLng < lng && lng < maxLng;
      //   const isLatInBbox = minLat < lat && lat < maxLat;
      //   if (isLngInBbox && isLatInBbox) {
      //     this.ngwMap.setCenter(lngLat);
      //   }
      // }
      this.ngwMap.setCenter(lngLat);
    };

    this.ngwMap.locate({ setView: false }, { locationfound });
  }

  private async _createAuthControl(auth: Auth) {
    const authBtn = document.getElementsByClassName(
      'js-auth-btn'
    )[0] as HTMLElement;
    const getStatus = () => {
      return !!(this.ngwMap.connector && this.ngwMap.connector.user);
    };
    const onClick = () => {
      auth.logout();
      window.location.reload();
    };
    authBtn.innerHTML = getStatus() ? 'Выйти' : 'Войти';
    authBtn.style.display = 'block';
    authBtn.addEventListener('click', onClick);
  }

  private _createShareControl() {
    const shareModal = document.getElementsByClassName('js-modal')[0];
    const closeModalBtn = document.getElementsByClassName('js-modal-close')[0];
    const shareModalContent = document.getElementsByClassName(
      'js-share-modal-content'
    )[0];
    const shareInput = document.getElementsByClassName(
      'js-share-input'
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
      }
    });
    this.ngwMap.addControl(shareControl, 'bottom-right');
  }

  private async _createGetCoordinateControl() {
    const control = new GetCoordinatePanelControl(this, {
      toggle: status => {
        if (status) {
          this._stopToggleControlsFor('coordinate');
          this.ngwMap.disableSelection();
        } else {
          this.ngwMap.enableSelection();
        }
      }
    });
    const toggleControl = await this.ngwMap.createToggleControl(control);
    this.ngwMap.addControl(toggleControl, 'top-left');
    this._stopToggleControlsCb.push({
      name: 'coordinate',
      stop: () => toggleControl.onClick(false)
    });
  }

  private _createLocateControl() {
    const onClick = () => this._locate();
    const locateControl = this.ngwMap.createButtonControl({
      html: '<i class="fas fa-location-arrow btn-control-icon"></i>',
      title: 'Найти меня на карте',
      onClick
    });
    this.ngwMap.addControl(locateControl, 'top-left');
  }

  private _createShareModalContent(url: string) {
    const social = [
      { id: 'tw', name: 'Twitter', icon: 'fab fa-twitter' },
      { id: 'vk', name: 'VK', icon: 'fab fa-vk' },
      { id: 'fb', name: 'Facebook', icon: 'fab fa-facebook-square' }
    ];

    const html = `<div class="buttons share-btn js-share-btn" data-url="${url}" data-title="" data-desc="">
      ${social
        .map(
          x => `<a class="button is-primary" data-id="${x.id}">
                    <span class="icon">
                        <i class="${x.icon}"></i>
                    </span>
                    <span>${x.name}</span>
                </a>`
        )
        .join('')}
    </div>`;
    return html;
  }

  private async _addUserFires(
    x?: NgwLayerOptions<'GEOJSON'>,
    adapterOptions?: VectorAdapterOptions,
    opt?: { noPhotos: boolean }
  ) {
    if (x) {
      const paint = x.adapterOptions.paint as CirclePaint;
      const layer = await this.ngwMap.addNgwLayer({
        resource: x,
        id: x.id,

        adapterOptions: {
          paint: {
            ...paint,
            stroke: true,
            fillOpacity: 0.6,
            radius: 5
          },
          selectable: true,
          selectedPaint: {
            ...paint,
            stroke: true,
            fillOpacity: 0.9,
            radius: 7
          },
          // selectOnHover: true,
          popupOnSelect: true,
          popupOptions: {
            createPopupContent: e => {
              if (e.feature) {
                const feature = e.feature as Feature<MultiPoint, Firms>;
                const content = this.popup.createPopupContent<
                  MultiPoint,
                  Firms
                >(feature, layer.resourceId);

                const noPhotos = opt?.noPhotos || false;
                if (!noPhotos) {
                  const resourceId = layer.resourceId;
                  const featureId = Number(feature.id);
                  const connector = this.ngwMap.connector;
                  if (resourceId && featureId) {
                    NgwKit.utils
                      .getNgwLayerItem({ featureId, resourceId, connector })
                      .then(item => {
                        if (item.extensions?.attachment?.length) {
                          this.popup._addPhotos(
                            content,
                            item.extensions.attachment,
                            resourceId,
                            featureId
                          );
                        }
                      });
                  }
                }

                return content;
              }
            }
          },
          ...adapterOptions
        }
      });
    }
  }

  private async _addFires(fires?: NgwLayerOptions<'GEOJSON'>[]) {
    if (fires) {
      for (const x of fires) {
        await this._addUserFires(
          x,
          {
            selectOnHover: true,
            propertiesFilter: [
              [
                'timestamp',
                'ge',
                Math.floor(Date.now() / 1000) -
                  Number(this.options.timedelta) * 3600
              ]
            ]
          },
          { noPhotos: true }
        );
      }
    }
  }

  private async _addTreeControl(opt: {
    ngwLayers: NgwLayers;
    fires: NgwLayerOptions<'GEOJSON'>[];
    userFires: NgwLayerOptions<'GEOJSON'>;
    bookmarks: ResourceHierarchy[];
  }) {
    const sidebarToggleBtn = document.getElementsByClassName('js-sidebar')[0];

    const isActive = () => sidebarToggleBtn.classList.contains('is-active');
    const activeBurger = () => sidebarToggleBtn.classList.add('is-active');
    const disactiveBurger = () =>
      sidebarToggleBtn.classList.remove('is-active');

    await this.ngwMap.onLoad();

    this.tree = new MapSettingsPanel(this, { ...opt, ngwMap: this.ngwMap });

    const toggle = (status?: boolean) => {
      status = status !== undefined ? status : isActive();
      if (status) {
        this._stopToggleControlsFor('tree');
        this.tree.show();
        activeBurger();
      } else {
        this.tree.hide();
        disactiveBurger();
      }
    };
    sidebarToggleBtn.addEventListener('click', () => {
      toggle();
    });
    setTimeout(() => {
      toggle();
    }, 500);
    this._stopToggleControlsCb.push({
      name: 'tree',
      stop: () => toggle(false)
    });
  }

  private _clean() {
    if (
      this._promises.getFeaturePromise &&
      this._promises.getFeaturePromise.cancel
    ) {
      this._promises.getFeaturePromise.cancel();
    }
    this.ngwMap.removeLayer('highlight');
  }

  private _highlighNgwLayer(e: NgwIdentify) {
    this._clean();
    const paramsList = NgwKit.utils.getIdentifyGeoJsonParams(e);
    const params = paramsList[0];
    if (params) {
      const resourceId = params.resourceId;
      this._promises.getFeaturePromise = this.ngwMap.connector
        .get('feature_layer.feature.item', null, {
          id: params.resourceId,
          fid: params.featureId,
          geom_format: 'geojson',
          srs: 4326
        })
        .then(item => {
          delete this._promises.getFeaturePromise;
          const geojson = NgwKit.utils.createGeoJsonFeature(item);
          this.ngwMap.addLayer('GEOJSON', {
            id: 'highlight',
            data: geojson,
            visibility: true,
            paint: { color: 'green', stroke: true, fillOpacity: '0.8' },
            // selectable: true,
            selectOnHover: true,
            popup: true,
            // popupOnSelect: true,
            popupOptions: {
              createPopupContent: e => {
                if (e.feature) {
                  const element = this.popup.createPopupContent(
                    e.feature,
                    resourceId
                  );
                  if (
                    item.extensions &&
                    item.extensions.attachment &&
                    item.extensions.attachment.length
                  ) {
                    this.popup._addPhotos(
                      element,
                      item.extensions.attachment,
                      params.resourceId,
                      params.featureId
                    );
                  }
                  return element;
                }
              }
            }
          });
        });
    }
  }

  private _stopToggleControlsFor(excludeControlName?: string) {
    this._stopToggleControlsCb.forEach(x => {
      if (x.name !== excludeControlName) {
        x.stop();
      }
    });
  }

  private _addEventsListeners() {
    this.ngwMap.emitter.on('ngw:select', e => this._highlighNgwLayer(e));
  }

  private _crateMeasureControl() {
    const measureControl = new PolylineMeasure({
      showBearings: true,
      bearingTextIn: 'In',
      bearingTextOut: 'Out',
      tooltipTextFinish: 'Кликните чтобы <b>завершить изменрение</b><br>',
      tooltipTextDelete: 'SHIFT + клик чтобы <b>удалить точку</b>',
      tooltipTextMove: 'Клик + тянуть чтобы <b>передвинуть точку</b><br>',
      tooltipTextResume: '<br>CTRL + клик чтобы <b>продолжить линию</b>',
      tooltipTextAdd: 'CTRL + клик чтобы <b>добавить точку</b>',
      measureControlTitleOn: 'Перейти в режим измерения',
      measureControlTitleOff: 'Выйти из режима измерений',
      measureControlLabel:
        '<i class="fas fa-ruler-combined btn-control-icon"></i>',
      measureControlClasses: [],
      unitControlLabel: {
        metres: 'м',
        kilometres: 'км'
      }
    });
    // @ts-ignore
    this.ngwMap.mapAdapter.map.on(
      // @ts-ignore
      'polylinemeasure:toggle',
      (opt: { sttus: boolean }) => {
        if (opt.sttus) {
          this._stopToggleControlsFor('measure');
          this.ngwMap.disableSelection();
        } else {
          this.ngwMap.setCursor('default');
          this.ngwMap.enableSelection();
        }
      }
    );
    this._stopToggleControlsCb.push({
      name: 'measure',
      stop: () => {
        if (measureControl._measuring) {
          measureControl._toggleMeasure();
        }
      }
    });
    return measureControl;
  }
}
