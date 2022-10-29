export function fetchSensorData(sensor: string) {
  const id = sensor;

  return fetch(`https://data.sensor.community/airrohr/v1/sensor/${id}/`, {
    method: 'GET',
  }).then((resp) => {
    return resp.text();
  });
}
