import { Measure } from '../assets/Leaflet.Measure-master/src/leaflet.measure';
import '../assets/Leaflet.Measure-master/src/leaflet.measure.css';
import { NgwMap } from '@nextgis/ngw-map';
import { addStopToggleControl, stopToggleControlsFor } from './ToggleControl';

import type { Map } from 'leaflet';

export function createMeasureControl(ngwMap: NgwMap): void {
  // @ts-ignore
  const control = new Measure({ locale: 'ru' });
  ngwMap.addControl(control, 'top-left');

  ngwMap.onLoad().then(() => {
    const map = ngwMap.mapAdapter.map as Map;
    if (map) {
      map.on('measure:start', () => {
        stopToggleControlsFor('measure');
        ngwMap.disableSelection();
      });
      map.on('measure:stop', () => {
        ngwMap.setCursor('default');
        ngwMap.enableSelection();
      });
    }
    addStopToggleControl('measure', () => {
      control.disableMeasure();
    });
  });
}
