import type { TimeUnit } from '../interfaces';

export function formatTime(dt: Date, unit: TimeUnit = 'ms'): number | string {
  const t = dt.getTime();
  return unit === 's' ? t / 1000 : dt.toISOString();
}
