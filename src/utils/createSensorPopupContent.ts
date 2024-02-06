import { fetchSensorsData } from './fetchSensorsData';

import type { SensorMeasureItem, SensorMeasureValueType } from '../interfaces';
import type { ChartDataset } from 'chart.js';
import type { Feature } from 'geojson';

export interface CreateExportPopupContentProps {
  feature: Feature;
  end?: Date;
  start?: Date;
  signal?: AbortSignal;
}

type ChartType = Partial<
  Record<SensorMeasureValueType, Partial<ChartDataset<'line'>>>
>;

export async function createSensorPopupContent({
  feature,
  signal,
}: CreateExportPopupContentProps): Promise<HTMLElement> {
  const popupElement = document.createElement('div');
  const { SID_T, PLACE } = feature.properties || {};

  const sensorIds = [SID_T, PLACE].filter(Boolean);
  if (sensorIds.length === 0) return popupElement;

  const sensorsData = await fetchSensorsData({
    sensorIds,
    lastHours: 24,
    signal,
  });
  if (sensorsData.length === 0) {
    popupElement.innerHTML = `Данные для ${sensorIds.length > 1 ? 'приёмников' : 'приёмника'} #${sensorIds} за последние 24 часа не найдены`;
    return popupElement;
  }
  sensorsData.reverse();

  const types: ChartType[] = [
    {
      P1: {},
      P2: {},
    },
    { humidity: {} },
    { temperature: {} },
  ];
  let index = 0;
  for (const t of types) {
    const chartElement = await createChart({
      types: t,
      sensorsData,
      showXAxis: index++ > types.length,
    });
    popupElement.appendChild(chartElement);
  }

  return popupElement;
}

async function createChart({
  types,
  showXAxis,
  sensorsData,
}: {
  types: ChartType;
  showXAxis: boolean;
  sensorsData: SensorMeasureItem[];
}) {
  // @ts-ignore
  await import('chartjs-adapter-moment');
  const { Chart } = await import('chart.js/auto');

  const chartCanvas = document.createElement('canvas');
  new Chart(chartCanvas, {
    data: {
      datasets: Object.entries(types)
        .filter(([t]) => sensorsData.some((s) => s.value_type === t))
        .map(([type, params]) => ({
          type: 'line',
          label: type,
          pointRadius: 1,
          ...params,
          data: sensorsData
            .filter((s) => s.value_type === type)
            .map((row) => ({
              x: new Date(row.datetime).getTime(),
              y: row.value,
            })),
        })),
    },
    options: {
      responsive: true,
      scales: {
        x: {
          display: showXAxis,
          type: 'time',
          time: {
            unit: 'hour',
            displayFormats: { hour: 'HH:mm' },
          },
        },
      },
    },
  });
  return chartCanvas;
}
