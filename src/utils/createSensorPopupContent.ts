import { Chart } from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';

import { fetchSensorsData } from './fetchSensorsData';

import type { SensorMeasureItem, SensorMeasureValueType } from '../interfaces';
import type { ChartDataset, PluginOptionsByType } from 'chart.js';
import type { AnnotationOptions } from 'chartjs-plugin-annotation';
import type { Feature } from 'geojson';

import 'chartjs-adapter-moment';

import './createSensorPopupContent.css';

Chart.register(annotationPlugin);

export interface CreateExportPopupContentProps {
  feature: Feature;
  end?: Date;
  start?: Date;
  signal?: AbortSignal;
}

interface Threshold {
  value: number;
  options?: Partial<AnnotationOptions<'line'>>;
}

type ChartType = {
  options?: { height?: number; units?: string };
  charts: Partial<
    Record<
      SensorMeasureValueType,
      Partial<ChartDataset<'line'>> & {
        threshold?: Partial<Threshold>;
      }
    >
  >;
};

function createPmAnnotationThreshold({
  value,
  color,
  label,
}: {
  value: number;
  color: string;
  label: string;
}): Partial<Threshold> {
  return {
    value,
    options: {
      borderColor: color,
      borderWidth: 3,
      borderDash: [5, 5],
      label: {
        display: false,
        backgroundColor: color,
        drawTime: 'afterDatasetsDraw',
        content: [`Порог СанПиН для ${label}`, `(${value} мкг/м3)`],
      },
      enter({ element }) {
        if (element.label) {
          element.label.options.display = true;
        }
        return true;
      },
      leave({ element }, event) {
        if (element.label) {
          element.label.options.display = false;
        }
        return true;
      },
    },
  };
}

const types: ChartType[] = [
  {
    options: { height: 200, units: 'мкг/м3' },
    charts: {
      P1: {
        label: 'PM 10',
        backgroundColor: '#1b9224',
        borderColor: '#1b9224',
        borderWidth: 1,
        threshold: createPmAnnotationThreshold({
          value: 60,
          color: '#1b9224',
          label: 'PM10',
        }),
      },
      P2: {
        label: 'PM 2.5',
        backgroundColor: '#08dddf',
        borderColor: '#08dddf',
        borderWidth: 1,
        threshold: createPmAnnotationThreshold({
          value: 35,
          color: '#08dddf',
          label: 'PM2.5',
        }),
      },
    },
  },
  {
    options: { height: 100, units: '%' },
    charts: {
      humidity: {
        label: 'Влажность',
        backgroundColor: '#ee9602',
        borderColor: '#ee9602',
      },
    },
  },
  {
    options: { height: 100, units: '°C' },
    charts: {
      temperature: {
        label: 'Температура',
        backgroundColor: '#e1014a',
        borderColor: '#e1014a',
      },
    },
  },
];

export async function createSensorPopupContent({
  feature,
  signal,
}: CreateExportPopupContentProps): Promise<HTMLElement> {
  const popupElement = document.createElement('div');
  const { SID_T, PLACE } = feature.properties || {};

  const sensorIds = [SID_T, PLACE].filter(Boolean);
  if (sensorIds.length === 0) return popupElement;

  popupElement.innerHTML = 'Загрузка...';
  updatePopupWithCharts({ signal, popupElement, sensorIds });

  return popupElement;
}

async function updatePopupWithCharts({
  signal,
  sensorIds,
  popupElement,
}: {
  signal?: AbortSignal;
  sensorIds: string[];
  popupElement: HTMLElement;
}) {
  try {
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
    popupElement.innerHTML = '';
    for (const [index, t] of types.entries()) {
      const chartElement = createChart({
        types: t,
        sensorsData,
        showXAxis: index >= types.length - 1,
      });
      popupElement.appendChild(chartElement);
    }
  } catch {
    popupElement.innerHTML = 'Ошибка загрузки';
  }
}

function getAnnotationPluginOptions(
  types: ChartType['charts'],
): Partial<PluginOptionsByType<'line'>> {
  const annotations: AnnotationOptions<'line'>[] = [];

  Object.entries(types).forEach(([type, params]) => {
    if (params.threshold) {
      const { value, options } = params.threshold;
      annotations.push({
        type: 'line',
        yMin: value,
        yMax: value,
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
        ...options,
      });
    }
  });
  const pluginOptions: Partial<PluginOptionsByType<'line'>> = {
    annotation: { annotations },
  };
  return pluginOptions;
}

function createChart({
  types,
  showXAxis,
  sensorsData,
}: {
  types: ChartType;
  plugins?: PluginOptionsByType<'line'>;
  showXAxis: boolean;
  sensorsData: SensorMeasureItem[];
}) {
  const { charts, options } = types;
  const { height, units } = options || {};
  const pluginOptions = getAnnotationPluginOptions(charts);
  const chartCanvas = document.createElement('canvas');
  chartCanvas.height = height || 200;
  console.log(chartCanvas.style.height);
  chartCanvas.className = 'sensor-char';
  new Chart(chartCanvas, {
    data: {
      datasets: Object.entries(charts)
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
      plugins: {
        ...pluginOptions,
        legend: {
          labels: {
            usePointStyle: true,
            generateLabels: (chart) => {
              return chart.data.datasets.map(function (dataset, i) {
                return {
                  text: dataset.label || '',
                  lineCap: 'round',
                  lineDash: [],
                  lineDashOffset: 0,
                  lineJoin: 'round',
                  lineWidth: 2,
                  strokeStyle: String(dataset.borderColor),
                  fillStyle: String(dataset.backgroundColor),
                  pointStyle: 'line',
                  rotation: 0,
                  hidden: !chart.isDatasetVisible(i),
                  datasetIndex: i,
                };
              });
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: true,
          },
          ticks: {
            display: showXAxis,
            autoSkip: true,

            maxTicksLimit: 12,
          },
          type: 'time',
          time: {
            unit: 'hour',
            displayFormats: { hour: 'HH:mm' },
          },
        },
        y: {
          afterFit: (scaleInstance) => {
            scaleInstance.width = 30;
          },
          title: {
            display: !!units,
            text: units,
            align: 'center',
            padding: { top: 20, bottom: 0 },
          },
        },
      },
    },
  });
  return chartCanvas;
}
