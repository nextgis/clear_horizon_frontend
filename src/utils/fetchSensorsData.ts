import { SENSOR_MEASUREMENT_API } from '../constants';

import type { SensorMeasureItem, SensorMeasureValueType } from '../interfaces';

export interface FetchSensorData {
  sensorIds: string[];
  valueType?: SensorMeasureValueType;
  lastHours?: number;
  start?: Date;
  end?: Date;
  signal?: AbortSignal;
}

export async function fetchSensorsData({
  valueType,
  lastHours,
  sensorIds,
  signal,
  start,
  end,
}: FetchSensorData): Promise<SensorMeasureItem[]> {
  const promises: Promise<SensorMeasureItem[]>[] = [];

  for (const sensorId of sensorIds) {
    const params: Record<string, string> = {
      sensor_id: sensorId,
    };
    if (valueType) {
      params.value_type = valueType;
    }
    if (lastHours) {
      params.lasthours = String(lastHours);
    } else {
      if (start) {
        params.start = start.toISOString();
      }
      if (end) {
        params.end = end.toISOString();
      }
    }

    const apiUrl = SENSOR_MEASUREMENT_API;

    promises.push(
      fetch(
        `${apiUrl}api/v1/measurements?${new URLSearchParams(params).toString()}`,
        {
          method: 'GET',
          signal,
        },
      ).then((resp) => {
        return resp.json();
      }),
    );
  }
  return Promise.all(promises).then((results) => results.flat());
}
