require('dotenv').config();
const {InfluxDB} = require('@influxdata/influxdb-client');

// ----------------- Queries data to InfluxDB example ---------------------------------- //


async function buildSensorObject() {
  const queryApi = new InfluxDB({url: process.env.URL, token: process.env.TOKEN}).getQueryApi(process.env.ORG);
  const fluxQuery = `from(bucket:"test_bucket") |> range(start: -10s)` 
  
  let sensorObj={
    sensor: {temperature: [], humidity: []},
    sensor2: {temperature: [], humidity: []},
    sensor3: {temperature: [], humidity: []},
    sensor4: {temperature: [], humidity: []},
    sensor5: {temperature: [], humidity: []},
    sensor6: {temperature: [], humidity: []}
  }

  console.log('*** QUERY ROWS ***')
  await queryApi.queryRows(fluxQuery, {
    next(row, tableMeta) {
      const o = tableMeta.toObject(row)
      //console.log(o)
      sensorObj[o._measurement][o._field].push(o._value)
      //console.log(sensorObj);
    },
      error(error) {
        console.error(error)
        console.log('\n Finished ERROR')
      },
      complete() {
        console.log('\nFinished SUCCESS')
        //console.log(sensorObj)
        for (let item in sensorObj) {
          //console.log(sensorObj[item])
          let tempLength = sensorObj[item].temperature.length;
          let humidLength = sensorObj[item].humidity.length;
          sensorObj[item].temperature = (sensorObj[item].temperature.reduce((a,b)=>a+b))/tempLength
          sensorObj[item].humidity = (sensorObj[item].humidity.reduce((a,b)=>a+b))/humidLength
        }
        console.log(sensorObj)
        return sensorObj;
      }
    })
}

buildSensorObject();