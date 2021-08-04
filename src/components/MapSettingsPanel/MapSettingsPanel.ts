import './MapSettingsPanel.css';
// @ts-ignore
import Sidebar from 'leaflet-sidebar';
import 'leaflet-sidebar/src/L.Control.Sidebar.css';
// import Sidebar from '../../assets/SidebarControl';
// import '../../assets/SidebarControl/SidebarControl.scss';
import '../../assets/SidebarControl/SidebarControlLeaflet.scss';

import { NgwLayers } from '@nextgis/ngw-map';

import { ActionMap } from '../ActionMap';
import { CollapsiblePanel } from './CollapsiblePanel';
import { WebmapTreeItem } from './WebmapTreeItem';
import { BaseMapsContainer } from './BaseMapsContainer';
import { BookmarksContainer } from './BookmarksContainer';
import { FiresContainer } from './FiresContainer';

import type { NgwLayerOptions } from '@nextgis/ngw-kit';
import type { MapSettingsPanelOptions } from './interfaces';
import { layerTimestampExtremum } from '../../utils/layerTimestampExtremum';
import { daysBehindRange } from '../../utils/daysBehindRange';
import { NOW } from '../../constants';
import { LayersContainer } from './LayersContainer';

const OPTIONS: Partial<MapSettingsPanelOptions> = {
  target: 'tree',
  // width: 300
};

export class MapSettingsPanel {
  options: MapSettingsPanelOptions;

  sidebar: Sidebar;

  private _container: HTMLElement;
  private _target: HTMLElement;

  private ngwLayers!: NgwLayers;

  constructor(private actionMap: ActionMap, options: MapSettingsPanelOptions) {
    this.options = { ...OPTIONS, ...options };
    if (typeof this.options.target === 'string') {
      const target = document.getElementById(this.options.target);
      if (target) {
        this._target = target;
      } else {
        throw new Error(
          `No element with ID #${this.options.target} in document for webmap tree`,
        );
      }
    } else if (this.options.target instanceof HTMLElement) {
      this._target = this.options.target;
    } else {
      throw new Error('`target` option is not set');
    }
    this.sidebar = new Sidebar(this._target, {
      closeButton: false,
      position: 'left',
      autoPan: false,
    });

    this.sidebar.addTo(this.actionMap.ngwMap.mapAdapter.map);
    // this.actionMap.ngwMap.createControl(this.sidebar).then((x) => {
    //   x.onAdd(this.actionMap.ngwMap.mapAdapter);
    // });

    // this.actionMap.ngwMap.addControl(sidebarControl, 'top-left');
    // this.sidebar.addTo(this.actionMap.ngwMap.mapAdapter.map);

    this.ngwLayers = this.options.ngwLayers;

    this._container = this._createContainer();
    if (!this.options.status) {
      this.hide();
    }
    this._target && this._target.appendChild(this._container);
  }

  show(): void {
    this._container.classList.remove('hidden');
    this.sidebar.show();
  }

  hide(): void {
    this.sidebar.hide();
    this._container.classList.add('hidden');
  }

  private _createContainer(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'tree-container';

    if (this.options.width !== undefined) {
      container.style.width = this.options.width + 'px';
    }

    if (this.options.userFires || this.options.firms) {
      new CollapsiblePanel({
        title: 'Пожары',
        content: () => this._createFiresContainer(),
        parent: container,
      });
    }
    if (this.options.sensors) {
      new CollapsiblePanel({
        title: 'Датчики',
        content: () => this._createSensorContainer(),
        parent: container,
      });
    }
    new CollapsiblePanel({
      title: 'Базовые слои',
      content: () => this._createNgwLayers(),
      open: false,
      parent: container,
    });
    new CollapsiblePanel({
      title: 'Подложки',
      content: () => this._createBasemapsContainer(),
      open: false,
      parent: container,
    });
    new CollapsiblePanel({
      title: 'Закладки',
      content: () => this._createBookmarksContainer(),
      open: false,
      parent: container,
    });

    return container;
  }

  private _createNgwLayers() {
    const container = document.createElement('div');
    container.className = 'webmap-tree-container';
    for (const n in this.ngwLayers) {
      const ngwLayer = this.ngwLayers[n];
      const tree = new WebmapTreeItem(ngwLayer.layer.layer);
      const treeContainer = tree.getContainer();
      if (treeContainer) {
        container.appendChild(treeContainer);
      }
    }
    return container;
  }

  private _createBookmarksContainer() {
    const container = document.createElement('div');
    const bookmarks = this.options.bookmarks;
    if (bookmarks) {
      const bookmarkContainer = new BookmarksContainer({
        bookmarks,
        ngwMap: this.options.ngwMap,
      });
      container.appendChild(bookmarkContainer.getContainer());
    }
    return container;
  }

  private async _createFiresContainer() {
    const container = document.createElement('div');
    const { firms, userFires } = this.options;
    let dateRange: [Date | undefined, Date | undefined] = [
      undefined,
      undefined,
    ];
    if (firms || userFires) {
      const fires: NgwLayerOptions<'GEOJSON'>[] = [];
      if (userFires && userFires.id) {
        fires.push(userFires);
        dateRange = await layerTimestampExtremum({
          layer: userFires,
          connector: this.options.ngwMap.connector,
        });
      }
      if (firms) {
        firms.forEach((x) => fires.push(x));
      }
      const timedelta = this.actionMap.options.timedelta || 24;
      const defaultDateRange = daysBehindRange(timedelta, NOW);
      const firesContainer = new FiresContainer({
        layers: fires,
        ngwMap: this.options.ngwMap,
        dateRange,
        defaultDateRange,
        timedelta: this.actionMap.options.timedelta || 72,
        onDateChange: () => {
          if (this.options.onDateChange) {
            this.options.onDateChange();
          }
        },
      });
      container.appendChild(firesContainer.getContainer());
    }
    return container;
  }

  private async _createSensorContainer() {
    const container = document.createElement('div');
    const { sensors } = this.options;
    if (sensors) {
      const firesContainer = new LayersContainer({
        layers: [sensors],
        ngwMap: this.options.ngwMap,
      });
      container.appendChild(firesContainer.getContainer());
    }
    return container;
  }

  private _createBasemapsContainer() {
    const container = document.createElement('div');
    const fires = this.options.firms;
    if (fires) {
      const baseMapsContainer = new BaseMapsContainer({
        ngwMap: this.options.ngwMap,
      });
      container.appendChild(baseMapsContainer.getContainer());
    }
    return container;
  }
}
