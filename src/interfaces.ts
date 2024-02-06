import type { NgwDateFormat, NgwTimeFormat } from '@nextgis/ngw-connector';
import type { NgwLayerOptions } from '@nextgis/ngw-kit';
import type { NgwMapOptions } from '@nextgis/ngw-map';
import type { VectorAdapterOptions } from '@nextgis/webmap';

export interface ConnectionOptions {
  acsUrl?: string;
  authUrl: string;
  showUrl: string;
}

export type FireResource = NgwLayerOptions<'GEOJSON'>;

export interface Bookmark {
  id: string;
  name: string;
}

export type Bookmarks = Bookmark[];

export interface BaseLayer {
  name?: string;
  qmsId: number;
}

export type FirmsLayerOptions = NgwLayerOptions<
  'GEOJSON',
  Firms,
  FiresLayerProps
>;
export type UserFiresLayerOptions = NgwLayerOptions<
  'GEOJSON',
  UserFires,
  FiresLayerProps
>;
export type SensorLayerOptions = NgwLayerOptions<'GEOJSON', Sensor>;

export interface AppOptions {
  mapOptions?: NgwMapOptions;
  firms?: FirmsLayerOptions[];
  userFires?: UserFiresLayerOptions;
  sensors?: SensorLayerOptions;
  basemaps?: BaseLayer[];
  timedelta: number;
}

export interface Firms {
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

export interface Sensor {
  id: number;
}

export interface UserFires {
  field_2: string;
  field_3: string;
  field_4: string;
  field_5: string;
  field_6: string;
  field_7: string;
  field_8: string;
  field_9: NgwDateFormat;
  field_10: NgwTimeFormat;
  field_11: number;
  field_12: string;
  field_13: number;
  field_14: string;
  field_15: string;
  field_16?: string;
  field_17: string;
  field_18: string;
  field_19: string;
  field_20?: any;
  field_21: string;
}

export type TimeUnit = 's' | 'ms' | 'ISO';

export interface FiresLayerProps {
  timeUnit?: TimeUnit;
  dateField: string;
}

export type FiresAdapterOptions = VectorAdapterOptions & {
  props: FiresLayerProps;
};

export type SensorMeasureValueType = 'P1' | 'P2' | 'humidity' | 'temperature';
export interface SensorMeasureItem {
  datetime: string;
  sensor_id: number;
  value: number;
  value_type: SensorMeasureValueType;
}
