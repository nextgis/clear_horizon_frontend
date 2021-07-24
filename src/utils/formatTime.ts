import type { TimeUnit } from '../interfaces';

export function formatTime(dt: Date, unit: TimeUnit = 'ms'): number {
  const t = dt.getTime();
  return unit === 's' ? t / 1000 : t;
}
