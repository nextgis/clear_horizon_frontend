import { MODIS_ID, SENSOR_ID, USERFIRE_ID, VIIRS_ID } from './constants';

import type { AppOptions, FiresAdapterOptions } from './interfaces';
import type { CirclePaint } from '@nextgis/paint';

const firmsAdapterOptions: FiresAdapterOptions = {
  limit: 2000,
  props: { dateField: 'timestamp', timeUnit: 's' },
};

const stroke: CirclePaint = {
  stroke: true,
  strokeColor: '#ffffff',
  strokeOpacity: 1,
  opacity: 1,
};

const options: AppOptions = {
  mapOptions: {
    target: 'map',
    bounds: [36.59, 43.385, 49.374, 50.214],
    baseUrl: 'https://clear-horizon.nextgis.com',
    resources: [
      {
        resource: 1,
        fit: true,
        adapterOptions: { selectable: true },
      },
    ],
  },
  timedelta: 72,
  basemaps: [
    {
      qmsId: 1135,
    },
    // {
    //   qmsId: 487,
    // },
  ],
  userFires: {
    resource: 'userfirepoints',
    id: USERFIRE_ID,
    adapterOptions: {
      paint: { color: 'rgb(100,20,40)', ...stroke },
      props: { dateField: 'field_9', timeUnit: 'ISO' },
    },
  },
  sensors: {
    resource: 446,
    id: SENSOR_ID,
    adapterOptions: {
      selectable: true,
      paint: {
        color: '#0000ff',
        radius: 5,
        ...stroke,
      },
    },
  },
  firms: [
    {
      resource: 103,
      id: MODIS_ID,
      adapterOptions: {
        paint: { color: 'red', ...stroke },
        ...firmsAdapterOptions,
      },
    },
    {
      resource: 105,
      id: VIIRS_ID,
      adapterOptions: {
        paint: { color: 'orange', ...stroke },
        ...firmsAdapterOptions,
      },
    },
  ],
};

export default options;
