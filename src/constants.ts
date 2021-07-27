export const DATE_RANGE_SELECT: [days: number, text: string][] = [
  [24, '1 день'],
  [48, '2 дня'],
  [72, '3 дня'],
  [96, '4 дня'],
  [120, '5 дней'],
  [144, '6 дней'],
  [168, 'неделя'],
];

export const USERFIRE_ID = 'USERFIRE';
export const MODIS_ID = 'MODIS';
export const VIIRS_ID = 'VIIRS';
export const SENSOR_ID = 'SENSOR';

export let NOW = new Date();

// update global NOW each hour for long session
setInterval(() => {
  NOW = new Date();
}, 60 * 60 * 1000);
