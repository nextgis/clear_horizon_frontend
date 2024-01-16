import { formatTime } from '../../utils/formatTime';

import { LayersContainer } from './LayersContainer';
import { createCalendar } from './createCalendar';

import type { LayersContainerOptions } from './LayersContainer';
import type { CreateCalendarOptions } from './createCalendar';
import type { FiresLayerProps } from '../../interfaces';
import type { ResourceAdapter } from '@nextgis/ngw-kit';
import type { PropertiesFilter } from '@nextgis/properties-filter';

export interface FiresContainerOptions extends LayersContainerOptions {
  dateRange: [Date | undefined, Date | undefined];
  defaultDateRange: [Date | undefined, Date | undefined];
  timedelta: number;
  onDateChange?: () => void;
}

export class FiresContainer extends LayersContainer<FiresContainerOptions> {
  protected _createContainer(): HTMLElement {
    const container = super._createContainer();

    const calendarWrapper = this._createCalendar();
    container.insertBefore(calendarWrapper, container.firstChild);
    return container;
  }

  private _createCalendar(): HTMLElement {
    const calendarWrapper = document.createElement('div');
    const fires = this.options.layers;

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
      const block = this._buildCalendarBlock(
        fires,
        this.options.dateRange,
        this.options.defaultDateRange,
      );
      calendarWrapper.appendChild(block);
    });

    return calendarWrapper;
  }

  private _buildCalendarBlock(
    layers: ResourceAdapter[],
    extremeItems: [Date?, Date?],
    defaultItems: [Date?, Date?],
  ) {
    const [min, max]: (Date | undefined)[] = extremeItems;
    const [startDate, endDate]: (Date | undefined)[] = defaultItems;
    const opt: CreateCalendarOptions = {
      timedelta: this.options.timedelta,
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
        if (this.options.onDateChange) {
          this.options.onDateChange();
        }
      },
    };
    if (min) {
      opt.minDate = min;
    }
    if (startDate) {
      opt.startDate = startDate;
    }
    if (max) {
      opt.maxDate = max;
    }
    if (endDate) {
      opt.endDate = endDate;
    }
    return createCalendar(opt);
  }
}
