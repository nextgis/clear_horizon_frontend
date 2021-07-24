import { fetchNgwLayerItems } from '@nextgis/ngw-kit';

import type NgwConnector from '@nextgis/ngw-connector';
import type { FetchNgwItemsOptions, NgwLayerOptions } from '@nextgis/ngw-kit';
import { NgwDateFormat } from '@nextgis/ngw-connector';

export function layerTimestampExtremum({
  connector,
  layer,
}: {
  connector: NgwConnector;
  layer: NgwLayerOptions<'GEOJSON'>;
}): Promise<[Date | undefined, Date | undefined]> {
  const resource = layer.resource;
  if (layer && resource && connector) {
    const dateField = layer.adapterOptions?.props?.dateField || 'field_9';
    return connector.getResourceIdOrFail(resource).then((resourceId) => {
      const extremeReqOpt: FetchNgwItemsOptions = {
        resourceId,
        fields: [dateField],
        geom: false,
        connector,
        limit: 1,
      };
      const extremePromises = [
        fetchNgwLayerItems({ ...extremeReqOpt, orderBy: [dateField] }),
        // fetchNgwLayerItems({ ...extremeReqOpt, orderBy: ['-' + dateField] }),
      ];
      return Promise.all(extremePromises).then(([minItem, maxItem]) => {
        const [min] = [minItem, maxItem].map((items) => {
          const item = items && items[0];
          if (item) {
            const ngwDate = item.fields[dateField] as NgwDateFormat;
            if (ngwDate) {
              return parseNgwDate(ngwDate);
            }
          }
          return undefined;
        });
        const max = new Date();
        return [min, max];
      });
    });
  }
  return Promise.resolve([undefined, undefined]);
}

function parseNgwDate(dt: NgwDateFormat): Date {
  return new Date(dt.year, dt.month - 1, dt.day);
}
