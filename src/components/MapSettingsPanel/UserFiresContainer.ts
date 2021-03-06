import { fetchNgwLayerItems } from '@nextgis/ngw-kit';

import { createCalendar } from './createCalendar';
import { FiresContainer } from './FiresContainer';

import type { ResourceAdapter, FetchNgwItemsOptions } from '@nextgis/ngw-kit';
import type { FeatureItem, NgwDateFormat } from '@nextgis/ngw-connector';
import type { PropertiesFilter } from '@nextgis/properties-filter';
import type { CreateCalendarOptions } from './createCalendar';
export class UserFiresContainer extends FiresContainer {
  protected _createContainer(): HTMLElement {
    const container = super._createContainer();

    const calendarWrapper = this._createCalendar();
    container.insertBefore(calendarWrapper, container.firstChild);
    return container;
  }

  private _createCalendar(): HTMLElement {
    const calendarWrapper = document.createElement('div');
    const fireItem = this.options.fires[0];
    const connector = this.options.ngwMap.connector;
    const resource = fireItem.resource;
    if (fireItem && resource && connector) {
      const dateField = fireItem.adapterOptions?.props?.dateField || 'field_9';
      connector.getResourceIdOrFail(resource).then((resourceId) => {
        const extremeReqOpt: FetchNgwItemsOptions = {
          resourceId,
          fields: [dateField],
          geom: false,
          connector,
        };
        const extremePromises = [
          fetchNgwLayerItems({ ...extremeReqOpt, orderBy: [dateField] }),
          fetchNgwLayerItems({ ...extremeReqOpt, orderBy: ['-' + dateField] }),
        ];
        Promise.all(extremePromises).then(([minItem, maxItem]) => {
          this.onLayerAdd(fireItem.id || String(fireItem.resource), (layer) => {
            const block = this._buildCalendarBlock(
              layer,
              [minItem, maxItem],
              dateField,
            );
            calendarWrapper.appendChild(block);
          });
        });
      });
    }

    return calendarWrapper;
  }

  private _buildCalendarBlock(
    layer: ResourceAdapter,
    extremeItems: FeatureItem[][],
    dateField: string,
  ) {
    const [min, max]: (null | Date)[] = extremeItems.map((items) => {
      const item = items[0];
      if (item) {
        const ngwDate = item.fields[dateField] as NgwDateFormat;
        if (ngwDate) {
          return this._parseNgwDate(ngwDate);
        }
      }
      return null;
    });
    const opt: CreateCalendarOptions = {
      onChange: (e) => {
        const filter: PropertiesFilter = [];
        if (e.start) {
          filter.push([dateField, 'ge', e.start.toISOString()]);
        }
        if (e.end) {
          filter.push([dateField, 'le', e.end.toISOString()]);
        }
        if (layer.propertiesFilter) {
          layer.propertiesFilter(filter);
        }
      },
    };
    if (min) {
      opt.minDate = min;
      opt.startDate = min;
    }
    if (max) {
      opt.maxDate = max;
      opt.endDate = max;
    }
    return createCalendar(opt);
  }

  private _parseNgwDate(dt: NgwDateFormat): Date {
    return new Date(dt.year, dt.month, dt.day);
  }
}
