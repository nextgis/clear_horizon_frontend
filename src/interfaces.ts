import type { VectorAdapterOptions } from '@nextgis/webmap';

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

export type TimeUnit = 's' | 'ms' | 'ISO';

export interface FiresLayerProps {
  timeUnit?: TimeUnit;
  dateField: string;
}

export type FiresAdapterOptions = VectorAdapterOptions & {
  props: FiresLayerProps;
};
