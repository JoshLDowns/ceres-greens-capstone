require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const { InfluxDB } = require('@influxdata/influxdb-client');

const twilio = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

let maxRanges = {
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

const fans = {
  section_1_2: { on: false, offSchedule: false },
  section_3_4: { on: true, offSchedule: false },
  section_5_6: { on: false, offSchedule: false },
  section_7_8: { on: true, offSchedule: false },
  section_9_10: { on: false, offSchedule: false },
}

const lighting = {
  section_1_2: { on: true, offSchedule: false },
  section_3_4: { on: true, offSchedule: false },
  section_5_6: { on: true, offSchedule: false },
  section_7_8: { on: true, offSchedule: false },
  section_9_10: { on: true, offSchedule: false },
}

const pumps = {
  section_1_2: { on: true, offSchedule: false },
  section_3_4: { on: false, offSchedule: false },
  section_5_6: { on: true, offSchedule: false },
  section_7_8: { on: false, offSchedule: false },
  section_9_10: { on: true, offSchedule: false },
}

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

function SMS(variable, value, sensor) {
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

app.get('/api', getSensorData)
app.get('/manage', getManagementData)
app.post('/query', queryInflux)

function fanSchedule() {
  for (let fan in fans) {
    if (!fans[fan].offSchedule) {
      fans[fan].on = !fans[fan].on
    }
    if (fans[fan].offSchedule) {
      fans[fan].offSchedule = false
    }
  }
}

function pumpSchedule() {
  for (let pump in pumps) {
    pumps[pump].on = !pumps[pump].on
  }
}

function lightSchedule() {
  for (let light in lighting) {
    lighting[light].on = !lighting[light].on
  }
}

async function getSensorData(req, res) {

  const queryApi = new InfluxDB({ url: process.env.URL, token: process.env.TOKEN }).getQueryApi(process.env.ORG);
  const fluxQuery = `from(bucket:"test_bucket") |> range(start: -10s)`

  let sensorObj = {
    sensor1: { temperature: [], humidity: [] },
    sensor2: { temperature: [], humidity: [] },
    sensor3: { temperature: [], humidity: [] },
    sensor4: { temperature: [], humidity: [] },
    sensor5: { temperature: [], humidity: [] },
    sensor6: { temperature: [], humidity: [] },
    sensor7: { temperature: [], humidity: [] },
    sensor8: { temperature: [], humidity: [] },
    sensor9: { temperature: [], humidity: [] },
    sensor10: { temperature: [], humidity: [] }
  }

  await queryApi.queryRows(fluxQuery, {
    next(row, tableMeta) {
      const o = tableMeta.toObject(row)
      sensorObj[o._measurement][o._field].push(o._value)
    },
    error(error) {
      console.error(error)
      console.log('\n Finished ERROR')
    },
    complete() {
      console.log('\nFinished SUCCESS')
      for (let item in sensorObj) {
        let tempLength = sensorObj[item].temperature.length;
        let humidLength = sensorObj[item].humidity.length;
        //creates average temperature to send to client
        sensorObj[item].temperature = sensorObj[item].temperature.length > 1 ? parseFloat(((sensorObj[item].temperature.reduce((a, b) => a + b)) / tempLength).toFixed(2)) : sensorObj[item].temperature[0]
        if (sensorObj[item].temperature < maxRanges.tempMin || sensorObj[item].temperature > maxRanges.tempMax) {
          if (sensorObj[item].temperature > maxRanges.tempMax) {
            if (item === 'sensor1' || item === 'sensor2') {
              fans['section_1_2'].on === false ? console.log('Critical temp in Section 1-2, turning fans on!') : null;
              fans['section_1_2'].on = true;
              fans['section_1_2'].offSchedule ? null : fans['section_1_2'].offSchedule = true;
            } else if (item === 'sensor3' || item === 'sensor4') {
              fans['section_3_4'].on === false ? console.log('Critical temp in Section 3-4, turning fans on!') : null;
              fans['section_3_4'].on = true;
              fans['section_3_4'].offSchedule ? null : fans['section_3_4'].offSchedule = true;
            } else if (item === 'sensor5' || item === 'sensor6') {
              fans['section_5_6'].on === false ? console.log('Critical temp in Section 5-6, turning fans on!') : null;
              fans['section_5_6'].on = true;
              fans['section_5_6'].offSchedule ? null : fans['section_5_6'].offSchedule = true;
            } else if (item === 'sensor7' || item === 'sensor8') {
              fans['section_7_8'].on === false ? console.log('Critical temp in Section 7-8, turning fans on!') : null;
              fans['section_7_8'].on = true;
              fans['section_7_8'].offSchedule ? null : fans['section_7_8'].offSchedule = true;
            } else {
              fans['section_9_10'].on === false ? console.log('Critical temp in Section 9-10, turning fans on!') : null;
              fans['section_9_10'].on = true;
              fans['section_9_10'].offSchedule ? null : fans['section_9_10'].offSchedule = true;
            }
          }

          //   SMS('Temperature', sensorObj[item].temperature, item)
          //   hitCritical[item] = true
          //   setTimeout(()=>{hitCritical[item] = false}, 3600000)

        }
        sensorObj[item].humidity = sensorObj[item].humidity.length > 1 ? parseFloat(((sensorObj[item].humidity.reduce((a, b) => a + b)) / humidLength).toFixed(2)) : sensorObj[item].humidity[0]

        // if (sensorObj[item].humidity < maxRanges.humMin || sensorObj[item].humidity > maxRanges.humMax) {
        //   SMS('Humidity', sensorObj[item].humidity, item)
        //   hitCritical[item] = true
        //   setTimeout(()=>{hitCritical[item] = false}, 3600000)
        // }
      }
      res.type('application/json').send(JSON.stringify(sensorObj));
    }
  })
}


function getManagementData(req, res) {
  let manageObj = {
    fans: [`Section 1-2: ${fans['section_1_2'].on ? 'on' : 'off'}`, `Section 3-4: ${fans['section_3_4'].on ? 'on' : 'off'}`, `Section 5-6: ${fans['section_5_6'].on ? 'on' : 'off'}`, `Section 7-8: ${fans['section_7_8'].on ? 'on' : 'off'}`, `Section 9-10: ${fans['section_9_10'].on ? 'on' : 'off'}`],
    lighting: [`Section 1-2: ${lighting['section_1_2'].on ? 'on' : 'off'}`, `Section 3-4: ${lighting['section_3_4'].on ? 'on' : 'off'}`, `Section 5-6: ${lighting['section_5_6'].on ? 'on' : 'off'}`, `Section 7-8: ${lighting['section_7_8'].on ? 'on' : 'off'}`, `Section 9-10: ${lighting['section_9_10'].on ? 'on' : 'off'}`],
    pumps: [`Section 1-2: ${pumps['section_1_2'].on ? 'on' : 'off'}`, `Section 3-4: ${pumps['section_3_4'].on ? 'on' : 'off'}`, `Section 5-6: ${pumps['section_5_6'].on ? 'on' : 'off'}`, `Section 7-8: ${pumps['section_7_8'].on ? 'on' : 'off'}`, `Section 9-10: ${pumps['section_9_10'].on ? 'on' : 'off'}`]
  }

  res.type('application/json').send(JSON.stringify(manageObj));
}

async function queryInflux(req, res) {
  let queryArray = []
  let queryRange = req.body.queryString
  let querySensor = req.body.sensor
  let queryMeasurement = req.body.measurement
  const queryApi = new InfluxDB({url: process.env.URL, token: process.env.TOKENTWO}).getQueryApi(process.env.ORG);
  const fluxQuery = `from(bucket:"perm_data") |> range(${queryRange}) |> filter(fn: (r) => r._measurement == "${querySensor}") |> filter(fn: (r) => r._field == "${queryMeasurement}")` 
  
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
        res.type('application/json').send(JSON.stringify(queryArray));
        console.log('\nFinished SUCCESS')
      }
    })
}

setInterval(() => fanSchedule(), 120000)
setInterval(() => pumpSchedule(), 300000)
setInterval(() => lightSchedule(), 1200000)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.listen(port, () => { console.log(`Listening on port: ${port}`) });