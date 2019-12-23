export default {
  mapOptions: {
    target: 'map',
    bounds: [45, 46, 47, 49],
    baseUrl: location.protocol + '//clear-horizon.nextgis.com',
    resources: [
      {
        selectable: true,
        resourceId: '1',
        fit: true
      }
    ]
  },
  basemaps: [
    {
      qmsId: 1135
    },
    {
      qmsId: 487
    }
  ],
  fires: [
    {
      resourceId: 103,
      id: 'MODIS',
      color: 'red'
    },
    {
      resourceId: 105,
      id: 'VIIRS',
      color: 'orange'
    }
  ]
};
