import { fetchSensorData } from './fetchSensorData';

import type { Feature } from 'geojson';

import type { SensorMeasureValueType } from '../interfaces';

export interface CreateExportPopupContentProps {
  feature: Feature;
  end?: Date;
  start?: Date;
}

export async function createSensorPopupContent({
  feature,
}: CreateExportPopupContentProps): Promise<HTMLElement> {
  const popupElement = document.createElement('div');
  const sensorId = feature.properties?.SID_T;
  if (sensorId !== undefined) {
    const sensor = await fetchSensorData({
      sensorId,
      // end,
      // start,
      lastHours: 24,
      // valueType: 'P1',
    });
    if (sensor.length) {
      const chartCanvas = document.createElement('canvas');
      sensor.reverse();
      // @ts-ignore
      await import('chartjs-adapter-moment');
      const { Chart } = await import('chart.js/auto');

      const types: SensorMeasureValueType[] = ['P1', 'P2'];

      new Chart(chartCanvas, {
        data: {
          datasets: types.map((t) => {
            return {
              type: 'line',
              label: t,
              // pointRadius: 0,

              data: sensor
                .filter((s) => s.value_type === t)
                .map((row) => {
                  const x = new Date(row.datetime).getTime();
                  return {
                    x,
                    y: row.value,
                  };
                }),
            };
          }),
        },
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'hour',
                displayFormats: {
                  hour: 'HH:mm',
                },
              },
            },
          },
        },
      });

      popupElement.appendChild(chartCanvas);
    } else {
      const notFoundDiv = document.createElement('div');
      notFoundDiv.innerHTML = `Данные для приёмника #${sensorId} за последние '24 часа' не найдены`;
      popupElement.appendChild(notFoundDiv);
    }
  }
  return popupElement;
}
