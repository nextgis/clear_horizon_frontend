import NgwMap, { NgwLayers, NgwLayerOptions } from '@nextgis/ngw-map';
import { ResourceHierarchy } from '@nextgis/ngw-connector';

export interface MapSettingsPanelOptions {
  target?: HTMLElement | string;
  width?: number;
  status?: boolean;
  ngwMap?: NgwMap;
  ngwLayers?: NgwLayers;
  userFires?: NgwLayerOptions<'GEOJSON'>;
  fires?: NgwLayerOptions<'GEOJSON'>[];
  bookmarks?: ResourceHierarchy[];
}
