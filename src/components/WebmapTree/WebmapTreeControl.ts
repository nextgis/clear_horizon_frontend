import '../ToggleControl.css';
import { ActionMap } from '../ActionMap';
import { ToggleControlOptions, MapClickEvent, VectorLayerAdapter } from '@nextgis/ngw-map';

import { EventEmitter } from 'events';
import { WebmapTreeOptions } from './interfaces';
import { WebmapTree } from './WebmapTree';



export class WebmapTreeControl implements ToggleControlOptions {

  html = '<span>&#9776;</span>';
  title = { off: 'Показать дерево слоёв', on: 'Скрыть дерево слоёв' };

  addClass = 'toggle-control webmap-tree-control';
  addClassOn = 'active';

  status: boolean = false;

  emitter = new EventEmitter();

  tree: WebmapTree;

  constructor(private actionMap: ActionMap, private options?: WebmapTreeOptions) {
    this.tree = new WebmapTree(options);
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
