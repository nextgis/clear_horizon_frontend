import type { AppOptions } from './src/App';
import type { FiresAdapterOptions } from './src/interfaces';

const firmsAdapterOptions: FiresAdapterOptions = {
  limit: 2000,
  props: { dateField: 'timestamp', timeUnit: 's' },
};

const options: AppOptions = {
  mapOptions: {
    target: 'map',
    bounds: [45, 46, 47, 49],
    // baseUrl: location.protocol + '//clear-horizon.nextgis.com',
    baseUrl: 'https://clear-horizon.nextgis.com',
    resources: [
      {
        resource: 1,
        fit: true,
        adapterOptions: { selectable: true },
      },
    ],
  },
  basemaps: [
    {
      qmsId: 1135,
    },
    {
      qmsId: 487,
    },
  ],
  userFires: {
    resource: 'userfirepoints',
    id: 'USERFIRE',
    adapterOptions: {
      paint: { color: 'rgb(100,20,40)' },
      props: { dateField: 'field_9', timeUnit: 'ISO' },
    },
  },
  fires: [
    {
      resource: 103,
      id: 'MODIS',
      adapterOptions: {
        paint: { color: 'red' },
        ...firmsAdapterOptions,
      },
    },
    {
      resource: 105,
      id: 'VIIRS',
      adapterOptions: {
        paint: { color: 'orange' },
        ...firmsAdapterOptions,
      },
    },
  ],
};

export default options;
