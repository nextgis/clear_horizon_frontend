import type { ControlOptions, LatLng, Polygon, Polyline } from 'leaflet';

export interface Messages {
  linearMeasurement: string;
  areaMeasurement: string;
  start: string;
  meter: string;
  kilometer: string;
  squareMeter: string;
  squareKilometers: string;
}

export interface MeasureOptions extends ControlOptions {
  title: string;
  collapsed: boolean;
  color: string;
  locale: string;
  messages: Messages;
}

export type MeasureModel = 'area' | 'distance';

export type DirectPath = Polyline | Polygon;

export interface MeasureActionOptions {
  color: string;
  model: MeasureModel;
  messages: Messages;
}

export interface Trail {
  overlays: any[];
  points: LatLng[];
}
