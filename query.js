require('dotenv').config();
const {InfluxDB} = require('@influxdata/influxdb-client');

// ----------------- Queries data to InfluxDB example ---------------------------------- //


async function buildSensorObject() {
  const queryApi = new InfluxDB({url: process.env.URL, token: process.env.TOKENTWO}).getQueryApi(process.env.ORG);
  const fluxQuery = `from(bucket:"perm_data") |> range(start: 2020-04-09T16:00:00Z, stop: 2020-04-09T17:00:00Z) |> filter(fn: (r) => r._measurement == "sensor1") |> filter(fn: (r) => r._field == "temperature" or r._field == "humidity")` 
  

  console.log('*** QUERY ROWS ***')
  await queryApi.queryRows(fluxQuery, {
    next(row, tableMeta) {
      const o = tableMeta.toObject(row)
      console.log(o)
      
      //console.log(sensorObj);
    },
      error(error) {
        console.error(error)
        console.log('\n Finished ERROR')
      },
      complete() {
        console.log('\nFinished SUCCESS')
      }
    })
}

buildSensorObject();