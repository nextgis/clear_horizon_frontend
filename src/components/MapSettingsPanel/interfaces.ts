import type { Map } from 'leaflet';

import type { NgwMap, NgwLayers } from '@nextgis/ngw-map';
import type { ResourceHierarchy } from '@nextgis/ngw-connector';
import type { NgwLayerOptions } from '@nextgis/ngw-kit';

export interface MapSettingsPanelOptions {
  target?: HTMLElement | string;
  width?: number;
  status?: boolean;
  ngwMap?: NgwMap<Map>;
  ngwLayers?: NgwLayers;
  userFires?: NgwLayerOptions<'GEOJSON'>;
  fires?: NgwLayerOptions<'GEOJSON'>[];
  bookmarks?: ResourceHierarchy[];
}
