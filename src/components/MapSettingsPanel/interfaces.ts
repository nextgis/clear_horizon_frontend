import type { Map } from 'leaflet';

import type { NgwMap, NgwLayers } from '@nextgis/ngw-map';
import type { ResourceHierarchy } from '@nextgis/ngw-connector';
import type {
  FirmsLayerOptions,
  SensorLayerOptions,
  UserFiresLayerOptions,
} from '../../interfaces';

export interface MapSettingsPanelOptions {
  target?: HTMLElement | string;
  width?: number;
  status?: boolean;
  ngwMap: NgwMap<Map>;
  ngwLayers: NgwLayers;
  userFires?: UserFiresLayerOptions;
  firms?: FirmsLayerOptions[];
  sensors?: SensorLayerOptions;
  bookmarks?: ResourceHierarchy[];
  onDateChange?: () => void;
}
