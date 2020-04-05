require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const {InfluxDB, Point, HttpError, FluxTableMetaData} = require('@influxdata/influxdb-client');
const {hostname} = require('os');
//const http = require('http');

app.use(express.static(path.join(__dirname, '/client/build')));

// ------------- For parsing data once we have the database ---------------------------- //

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

// ------------------------------------------------------------------------------------- //

// ----------------- Writes data to InfluxDB example ----------------------------------- //

const writeApi = new InfluxDB({url: process.env.URL, token: process.env.TOKEN}).getWriteApi(process.env.ORG, process.env.BUCKET);
writeApi.useDefaultTags({location: hostname()})

const point1= new Point('temperature')
  .tag('example', 'write.ts')
  .floatField('value', 20 + Math.round(100 * Math.random()) / 10)
writeApi.writePoint(point1)
console.log(` ${point1}`)

const point2 = new Point('temperature')
  .tag('example', 'write.ts')
  .floatField('value', 20 + Math.round(100 * Math.random()) / 10)
writeApi.writePoint(point2)
console.log(` ${point2}`)

writeApi
  .close()
  .then(()=> {
    console.log('Finished ...')
  })
  .catch(e => {
    console.error(e)
    if (e instanceof HttpError && e.statusCode === 401) {
      console.log('Run ./onboarding.js to setup a new InfluxDB database.')
    }
    console.log('\nFinished ERROR')
  })

// ------------------------------------------------------------------------------------- //


// const queryApi = new InfluxDB({url: process.env.URL, token: process.env.TOKEN}).getQueryApi(process.env.ORG);
// const fluxQuery = `from(bucket:"test_bucket") |> range(start:0) |> filter(fn: (r) => r._measuerment == "temperature")`

// console.log('*** QUERY ROWS ***')
// queryApi.queryRows(fluxQuery, {
//   next(row, tableMeta) {
//     const o = tableMeta.toObject(row)
//     console.log(
//       `${o._time} ${o._measuerment} in '${o.location}' (${o.example}): ${o._field}=${o._value}`
//     )
//   },
//   error(error) {
//     console.error(error)
//     console.log('\n Finished ERROR')
//   },
//   complete() {
//     console.log('\nFinished SUCCESS')
//   }
// })


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});
//sets server to listen on defined port, only used for testing before we  have the acutal database
app.listen(port, () => { console.log(`Listening on port: ${port}`) });