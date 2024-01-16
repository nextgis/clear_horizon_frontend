import type { Messages } from './interfaces';
import type { LatLng } from 'leaflet';

export function toRadians(deg: number): number {
  return deg * (Math.PI / 180);
}
export function square(x: number): number {
  return Math.pow(x, 2);
}
export function getDistanceString(
  distance: number,
  messages: { meter: string; kilometer: string },
): string {
  return distance < 1e3
    ? numberFormat(distance, 0) + ' ' + messages.meter
    : numberFormat(distance / 1e3, 2) + ' ' + messages.kilometer;
}

export function getDistance(latlng1: LatLng, latlng2: LatLng): number {
  const earthRadius = 6378137; // radius of the earth in meter
  const lat1 = toRadians(latlng1.lat);
  const lat2 = toRadians(latlng2.lat);
  const lat_dif = lat2 - lat1;
  const lng_dif = toRadians(latlng2.lng - latlng1.lng);
  const a =
    square(Math.sin(lat_dif / 2)) +
    Math.cos(lat1) * Math.cos(lat2) * square(Math.sin(lng_dif / 2));
  return 2 * earthRadius * Math.asin(Math.sqrt(a));
}
export function getAreaString(points: LatLng[], messages: Messages): string {
  const a = Math.round(getArea(points));
  return a < 1e6
    ? numberFormat(a, 0) + ' ' + messages.squareMeter
    : numberFormat(a / 1e6, 2) + ' ' + messages.squareKilometers;
}
export function getArea(points: LatLng[]): number {
  const earthRadius = 6378137;
  let area = 0;
  const len = points.length;
  let x1 = points[len - 1].lng;
  let y1 = points[len - 1].lat;
  for (let i = 0; i < len; i++) {
    const x2 = points[i].lng;
    const y2 = points[i].lat;
    area +=
      toRadians(x2 - x1) *
      (2 + Math.sin(toRadians(y1)) + Math.sin(toRadians(y2)));
    x1 = x2;
    y1 = y2;
  }
  return Math.abs((area * earthRadius * earthRadius) / 2.0);
}
export function numberFormat(number: number, decimals = 2): string {
  const thousandsSep = ',';
  const sign = number < 0 ? '-' : '';
  const num = Math.abs(+number || 0);
  const intPart = parseInt(num.toFixed(decimals), 10) + '';
  const j = intPart.length > 3 ? intPart.length % 3 : 0;

  return [
    sign,
    j ? intPart.substr(0, j) + thousandsSep : '',
    intPart.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousandsSep),
    decimals
      ? '.' +
        Math.abs(num - Number(intPart))
          .toFixed(decimals)
          .slice(2)
      : '',
  ].join('');
}
