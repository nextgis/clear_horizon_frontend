import type { FiresAdapterOptions, TimeUnit } from '../interfaces';
import type { PropertiesFilter } from '@nextgis/properties-filter';

export function daysBehindRange(days: number, to?: Date): [Date, Date] {
  const to_ = to ? to.getTime() : Date.now();
  const from = to_ - Number(days) * 1000 * 60 * 60;
  return [from, to_].map((x) => new Date(x)) as [Date, Date];
}

export function daysBehindRangeFormat(
  days: number,
  unit: TimeUnit = 's',
  to?: Date,
): [number | string, number | string] {
  return daysBehindRange(days, to).map((x) =>
    unit === 'ISO'
      ? new Date(x).toISOString()
      : unit === 's'
        ? Math.ceil(x.getTime()) / 1000
        : x.getTime(),
  ) as [number | string, number | string];
}

export function daysBehindFilter(
  days: number,
  layer: FiresAdapterOptions,
  to?: Date,
): PropertiesFilter {
  const { timeUnit, dateField } = layer.props;
  const range = daysBehindRangeFormat(days, timeUnit, to);
  return range.map((x, i) => [dateField, i ? 'le' : 'ge', x]);
}
