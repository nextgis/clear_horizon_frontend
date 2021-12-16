export function fetchSensorData(sensor: string) {
  const id = sensor;
  const q = `
    SELECT mean("SDS011_P1") AS "SDS011 PM10" FROM "sensors"
      WHERE ("node" =~ /^${id}$/ AND "type" = 'SDS011')
      AND time >= now() - 28d and time <= now()
      GROUP BY time(1h) fill(null);

      SELECT mean("PMS_P1") AS "PMSx003 PM10" FROM "sensors"
      WHERE ("node" =~ /^${id}$/ AND "type" = 'PMS')
      AND time >= now() - 28d and time <= now()
      GROUP BY time(1h) fill(null);

      SELECT mean("HPM_P1") AS "HPM PM10" FROM "sensors"
      WHERE ("node" =~ /^${id}$/ AND "type" = 'HPM')
      AND time >= now() - 28d and time <= now()
      GROUP BY time(1h) fill(null);

      SELECT mean("SPS30_P1") AS "SPS30 PM10" FROM "sensors"
      WHERE ("node" =~ /^${id}$/ AND "type" = 'SPS30')
      AND time >= now() - 28d and time <= now()
      GROUP BY time(1h) fill(null)`;

  return fetch(
    'https://api-rrd.madavi.de/grafana/api/datasources/proxy/1/query?db=sensorcommunity&epoch=ms',
    {
      method: 'POST',
      body: JSON.stringify({
        q,
      }),
    },
  ).then((resp) => {
    return resp.text();
  });
}
