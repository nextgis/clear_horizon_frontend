import type { Messages } from './interfaces';

export const I18N: Record<string, Messages> = {
  en: {
    linearMeasurement: 'Distance measurement',
    areaMeasurement: 'Area measurement',
    start: 'Start',
    meter: 'm',
    kilometer: 'km',
    squareMeter: 'm²',
    squareKilometers: 'km²',
  },
  ru: {
    linearMeasurement: 'Измерение расстояния',
    areaMeasurement: 'Измерение площади',
    start: 'Старт',
    meter: 'м',
    kilometer: 'км',
    squareMeter: 'м²',
    squareKilometers: 'км²',
  },
};
