import '../ToggleControl.css';
import { ActionMap } from '../ActionMap';
import { ToggleControlOptions } from '@nextgis/ngw-map';

import { EventEmitter } from 'events';
import { MapSettingsPanelOptions } from './interfaces';
import { MapSettingsPanel } from './MapSettingsPanel';

export class MapSettingsPanelControl implements ToggleControlOptions {
  html = '<span>&#9776;</span>';
  title = { off: 'Показать настройки карты', on: 'Скрыть настройки карты' };

  addClass = 'toggle-control webmap-tree-control';
  addClassOn = 'active';

  status = false;

  emitter = new EventEmitter();

  tree: MapSettingsPanel;

  constructor(private actionMap: ActionMap, options?: MapSettingsPanelOptions) {
    this.tree = new MapSettingsPanel(options);
  }

  onClick(status: boolean) {
    this.toggleControl(status);
  }

  show() {
    this.tree.show();
    this.invalidateMapSize();
  }

  hide() {
    this.tree.hide();
    this.invalidateMapSize();
  }

  private invalidateMapSize() {
    if (this.actionMap.ngwMap.mapAdapter.map.invalidateSize) {
      this.actionMap.ngwMap.mapAdapter.map.invalidateSize();
    }
  }

  private toggleControl(status?: boolean) {
    status = status !== undefined ? status : !this.status;
    if (status) {
      this.show();
    } else {
      this.hide();
    }

    this.status = status;
    this.emitter.emit('status', this.status);
  }
}
