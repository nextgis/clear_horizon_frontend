import NgwMap, { NgwLayers } from '@nextgis/ngw-map';
import { FireResource } from 'src/App';

export interface MapSettingsPanelOptions {
  target?: HTMLElement | string;
  width?: number;
  status?: boolean;
  ngwMap?: NgwMap;
  ngwLayers?: NgwLayers;
  fires?: FireResource[];
}
