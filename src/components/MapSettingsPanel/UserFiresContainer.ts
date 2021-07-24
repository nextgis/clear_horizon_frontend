import { formatTime } from '../../utils/formatTime';
import { createCalendar } from './createCalendar';
import { FiresContainer } from './FiresContainer';

import type { ResourceAdapter } from '@nextgis/ngw-kit';
import type { PropertiesFilter } from '@nextgis/properties-filter';
import type { CreateCalendarOptions } from './createCalendar';
import type { FiresLayerProps } from '../../interfaces';
export class UserFiresContainer extends FiresContainer {
  protected _createContainer(): HTMLElement {
    const container = super._createContainer();

    const calendarWrapper = this._createCalendar();
    container.insertBefore(calendarWrapper, container.firstChild);
    return container;
  }

  private _createCalendar(): HTMLElement {
    const calendarWrapper = document.createElement('div');
    const fires = this.options.fires;

    const promises: Promise<ResourceAdapter>[] = [];
    fires.forEach((x) => {
      const id = x.id;
      if (id) {
        const promise = new Promise<ResourceAdapter>((resolve) => {
          this.onLayerAdd(id, resolve);
        });
        promises.push(promise);
      }
    });
    Promise.all(promises).then((fires) => {
      const block = this._buildCalendarBlock(fires, this.options.dateRange);
      calendarWrapper.appendChild(block);
    });

    return calendarWrapper;
  }

  private _buildCalendarBlock(
    layers: ResourceAdapter[],
    extremeItems: [Date?, Date?],
  ) {
    const [min, max]: (Date | undefined)[] = extremeItems;

    const opt: CreateCalendarOptions = {
      onChange: (e) => {
        for (const l of layers) {
          const { dateField, timeUnit } = (l.options.props ||
            {}) as FiresLayerProps;
          if (dateField) {
            const filter: PropertiesFilter = [];
            if (e.start) {
              filter.push([dateField, 'ge', formatTime(e.start, timeUnit)]);
            }
            if (e.end) {
              filter.push([dateField, 'le', formatTime(e.end, timeUnit)]);
            }
            if (l.propertiesFilter) {
              l.propertiesFilter(filter);
            }
          }
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
}
