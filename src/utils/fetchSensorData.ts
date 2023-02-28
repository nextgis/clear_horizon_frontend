import { SENSOR_MEASUREMENT_API } from '../constants';
import type { SensorMeasureItem, SensorMeasureValueType } from '../interfaces';

export interface FetchSensorData {
  sensorId: string;
  valueType?: SensorMeasureValueType;
  lastHours?: number;
  start?: Date;
  end?: Date;
}

export function fetchSensorData({
  valueType,
  lastHours,
  sensorId,
  start,
  end,
}: FetchSensorData): Promise<SensorMeasureItem[]> {
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

  return fetch(
    `${apiUrl}api/v1/measurements?${new URLSearchParams(params).toString()}`,
    {
      method: 'GET',
    },
  ).then((resp) => {
    return resp.json();
  });
}
