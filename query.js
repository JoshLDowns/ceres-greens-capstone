require('dotenv').config();
const {InfluxDB} = require('@influxdata/influxdb-client');

// ----------------- Queries data to InfluxDB example ---------------------------------- //


async function buildSensorObject() {
  let queryArray = []
  let querySensor = 'sensor1'
  const queryApi = new InfluxDB({url: process.env.URL, token: process.env.TOKENTWO}).getQueryApi(process.env.ORG);
  const fluxQuery = `from(bucket:"perm_data") |> range(start: -1h) |> filter(fn: (r) => r._measurement == "${querySensor}") |> filter(fn: (r) => r._field == "temperature" or r._field == "humidity")`

  await queryApi.queryRows(fluxQuery, {
    next(row, tableMeta) {
      const o = tableMeta.toObject(row)
      queryArray.push(o);
    },
      error(error) {
        console.error(error)
        console.log('\n Finished ERROR')
      },
      complete() {
        console.log(queryArray)
        console.log('\nFinished SUCCESS')
      }
    })
}

buildSensorObject();