require('dotenv').config();
const {InfluxDB} = require('@influxdata/influxdb-client');

// ----------------- Queries data to InfluxDB example ---------------------------------- //

const queryApi = new InfluxDB({url: process.env.URL, token: process.env.TOKEN}).getQueryApi(process.env.ORG);
const fluxQuery = `from(bucket:"test_bucket") |> range(start: -1h)` 

console.log('*** QUERY ROWS ***')
queryApi.queryRows(fluxQuery, {
  next(row, tableMeta) {
    const o = tableMeta.toObject(row)
    console.log(
      `${o._time} ${o._measurement} in '${o.location}' (${o.example}): ${o._field}=${o._value}`
    )
  },
  error(error) {
    console.error(error)
    console.log('\n Finished ERROR')
  },
  complete() {
    console.log('\nFinished SUCCESS')
  }
})