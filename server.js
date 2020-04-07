require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const {InfluxDB, Point, HttpError, FluxTableMetaData} = require('@influxdata/influxdb-client');
const {hostname} = require('os');
const twilio = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)
let maxRanges={
  tempMax: 72,
  tempMin: 64,
  humMax: 58,
  humMin: 50
}
const hitCritical = {
  sensor: false,
  sensor2: false,
  sensor3: false,
  sensor4: false,
  sensor5: false,
  sensor6: false
}

app.use(express.static(path.join(__dirname, '/client/build')));

function SMS (variable, value, sensor) {
  const numbers = ['+18023428093', '+18023380386', '+18022338198', '+19076120335']
  const body = `${sensor} has a CRITICAL reading\n${variable}: ${value}`

  Promise.all(
    numbers.map(number => {
      return twilio.messages.create({
        to: number,
        from: process.env.TWILIO_NUMBER,
        body: body
      });
    })
  )
    .then(messages => {
      console.log('Messages sent!');
    })
    .catch(err => console.error(err));
  
}


// ------------- For parsing data once we have the database ---------------------------- //

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

// ------------------------------------------------------------------------------------- //

// ----------------- Writes data to InfluxDB example ----------------------------------- //

// const writeApi = new InfluxDB({url: process.env.URL, token: process.env.TOKEN}).getWriteApi(process.env.ORG, process.env.BUCKET);
// writeApi.useDefaultTags({location: hostname()})

// const point1= new Point('temperature')
//   .tag('example', 'write.ts')
//   .floatField('value', 20 + Math.round(100 * Math.random()) / 10)
// writeApi.writePoint(point1)
// console.log(` ${point1}`)

// const point2 = new Point('temperature')
//   .tag('example', 'write.ts')
//   .floatField('value', 20 + Math.round(100 * Math.random()) / 10)
// writeApi.writePoint(point2)
// console.log(` ${point2}`)

// writeApi
//   .close()
//   .then(()=> {
//     console.log('Finished ...')
//   })
//   .catch(e => {
//     console.error(e)
//     if (e instanceof HttpError && e.statusCode === 401) {
//       console.log('Run ./onboarding.js to setup a new InfluxDB database.')
//     }
//     console.log('\nFinished ERROR')
//   })

// ------------------------------------------------------------------------------------- //

app.get('/api', getSensorData)

async function getSensorData(req, res) {

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
          sensorObj[item].temperature = parseFloat(((sensorObj[item].temperature.reduce((a,b)=>a+b))/tempLength).toFixed(2))
          // if (sensorObj[item].temperature < maxRanges.tempMin || sensorObj[item].temperature > maxRanges.tempMax) {
          //   SMS('Temperature', sensorObj[item].temperature, item)
          //   hitCritical[item] = true
          //   setTimeout(()=>{hitCritical[item] = false}, 3600000)
          // }
          sensorObj[item].humidity = parseFloat(((sensorObj[item].humidity.reduce((a,b)=>a+b))/humidLength).toFixed(2))
          // if (sensorObj[item].humidity < maxRanges.humMin || sensorObj[item].humidity > maxRanges.humMax) {
          //   SMS('Humidity', sensorObj[item].humidity, item)
          //   hitCritical[item] = true
          //   setTimeout(()=>{hitCritical[item] = false}, 3600000)
          // }
        }
        //console.log(sensorObj)
        res.type('application/json').send(JSON.stringify(sensorObj));
      }
    })
}


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});
//sets server to listen on defined port, only used for testing before we  have the acutal database
app.listen(port, () => { console.log(`Listening on port: ${port}`) });