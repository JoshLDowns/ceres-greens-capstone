//initial variable declaration and imports
require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const { InfluxDB } = require('@influxdata/influxdb-client');
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://joshldowns:${process.env.PASSWORD}@josh-d-blog-archive-wxvci.mongodb.net/ceres-greens?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})

//initializes twilio account
const twilio = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

//declares the ranges variable that is set on launch
let ranges;

//declares the initial numbers variable that is set on launch
let numbers;

// when a text is sent, it sets that sensor to true so there won't be multiple text messages
const hitCritical = {
  sensor: false,
  sensor2: false,
  sensor3: false,
  sensor4: false,
  sensor5: false,
  sensor6: false,
  sensor7: false,
  sensor8: false,
  sensor9: false,
  sensor10: false,
  sensor11: false,
  sensor12: false,
  sensor13: false,
  sensor14: false,
  sensor15: false,
  sensor16: false,
  germRm: false,
  zone1: false,
  zone2: false,
  zone3: false
}

//simulated machines, this would eventually live in it's own database
const fans = {
  section_1_2_11_12: { on: false, offSchedule: false },
  section_3_4_13_14: { on: true, offSchedule: false },
  section_5_6_15_16: { on: false, offSchedule: false },
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
//------------------------------------------------------------//

//initialze the mongo database connection
const newDataBase = mongoose.connection;

newDataBase.on('error', (err)=>{console.log('Something went wrong:',err)});
newDataBase.once('open', ()=>{console.log('Connected...')});

//schema for temperature, humidity, EC, and pH ranges in mongoDB
const rangesSchema = new mongoose.Schema({
  ranges: {
    tempRanges: {
      criticalLow: Number,
      warningLow: Number,
      normal: Number,
      warningHigh: Number
    },
    humRanges: {
      criticalLow: Number,
      warningLow: Number,
      normal: Number,
      warningHigh: Number
    },
    germRmECRanges: {
      criticalLow: Number,
      warningLow: Number,
      normal: Number,
      warningHigh: Number
    },
    germRmpHRanges: {
      criticalLow: Number,
      warningLow: Number,
      normal: Number,
      warningHigh: Number
    },
    zone1ECRanges: {
      criticalLow: Number,
      warningLow: Number,
      normal: Number,
      warningHigh: Number
    },
    zone1pHRanges: {
      criticalLow: Number,
      warningLow: Number,
      normal: Number,
      warningHigh: Number
    },
    zone2ECRanges: {
      criticalLow: Number,
      warningLow: Number,
      normal: Number,
      warningHigh: Number
    },
    zone2pHRanges: {
      criticalLow: Number,
      warningLow: Number,
      normal: Number,
      warningHigh: Number
    },
    zone3ECRanges: {
      criticalLow: Number,
      warningLow: Number,
      normal: Number,
      warningHigh: Number
    },
    zone3pHRanges: {
      criticalLow: Number,
      warningLow: Number,
      normal: Number,
      warningHigh: Number
    }
  }
})

const Ranges = mongoose.model('Ranges', rangesSchema, 'ranges')

//schema for phone numbers in mongoDB
const numberSchema = new mongoose.Schema({
  numbers: [{name: String, email: String, number: String}]
})

const Numbers = mongoose.model('Numbers', numberSchema, 'sms')

//setting express and body parser usage
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//path handlers
app.get('/api', getSensorData)
app.get('/manage', getManagementData)
app.get('/getRanges', getRanges)
//app.post('changeRanges', changeRanges)
app.post('/query', queryInflux)
app.post('/clickQuery', clickQueryInflux)

//machine schedule simulations, eventually these will be determined by full schedules living in a database
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
//------------------------------------------------------------------------------------------------------//

//Sends SMS message based on sensor in critical range
function SMS(variable, value, sensor, numbers) {
  //const body = `${sensor} has a CRITICAL reading\n${variable}: ${value}`

  Promise.all(
    numbers.map(number => {
      return twilio.messages.create({
        to: number.number,
        from: process.env.TWILIO_NUMBER,
        body: `Hey ${number.name}! ${sensor} has a CRITICAL reading\n${variable}: ${value}`
      });
    })
  )
    .then(messages => {
      console.log('Messages sent!');
    })
    .catch(err => console.error(err));

}

//builds an object that can be sent back to the application to be used for displaying sensor information
async function getSensorData(req, res) {

  const queryApi = new InfluxDB({ url: process.env.URL, token: process.env.TOKEN }).getQueryApi(process.env.ORG);
  const fluxQuery = `from(bucket:"test_bucket") |> range(start: -10s)`

  //initializes the shape of the object, this will not be procedurally generated, because it is how we want it to look on the other side of the application
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
    sensor10: { temperature: [], humidity: [] },
    sensor11: { temperature: [], humidity: [] },
    sensor12: { temperature: [], humidity: [] },
    sensor13: { temperature: [], humidity: [] },
    sensor14: { temperature: [], humidity: [] },
    sensor15: { temperature: [], humidity: [] },
    sensor16: { temperature: [], humidity: [] },
    germRm: { EC: [], pH: [] },
    zone1: { EC: [], pH: [] },
    zone2: { EC: [], pH: [] },
    zone3: { EC: [], pH: [] }
  }

  //queries Influx, pushes values to the correct array in the predefined object
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
        if (sensorObj[item].temperature) {
          //determines length to use as divisor when computing averages of each array
          let tempLength = sensorObj[item].temperature.length;
          let humidLength = sensorObj[item].humidity.length;
          //creates average temperature to send to client
          sensorObj[item].temperature = sensorObj[item].temperature.length > 1 ? parseFloat(((sensorObj[item].temperature.reduce((a, b) => a + b)) / tempLength).toFixed(2)) : sensorObj[item].temperature[0]
          
          //if temperatures are in critical ranges, it turns on the fans
          if (sensorObj[item].temperature < ranges.tempRanges.criticalLow || sensorObj[item].temperature > ranges.tempRanges.warningHigh) {
            if (sensorObj[item].temperature > ranges.tempRanges.warningHigh) {
              if (item === 'sensor1' || item === 'sensor2' || item === 'sensor11' || item === 'sensor12') {
                fans['section_1_2_11_12'].on === false ? console.log('Critical temp in Section 1-2-11-12, turning fans on!') : null;
                fans['section_1_2_11_12'].on = true;
                fans['section_1_2_11_12'].offSchedule ? null : fans['section_1_2_11_12'].offSchedule = true;
              } else if (item === 'sensor3' || item === 'sensor4' || item === 'sensor13' || item === 'sensor14') {
                fans['section_3_4_13_14'].on === false ? console.log('Critical temp in Section 3-4-13-14, turning fans on!') : null;
                fans['section_3_4_13_14'].on = true;
                fans['section_3_4_13_14'].offSchedule ? null : fans['section_3_4_13_14'].offSchedule = true;
              } else if (item === 'sensor5' || item === 'sensor6') {
                fans['section_5_6_15_16'].on === false ? console.log('Critical temp in Section 5-6-15-16, turning fans on!') : null;
                fans['section_5_6_15_16'].on = true;
                fans['section_5_6_15_16'].offSchedule ? null : fans['section_5_6_15_16'].offSchedule = true;
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
            //sends sms if temperature is in critical range

            //   SMS('Temperature', sensorObj[item].temperature, item, numbers)
            //   hitCritical[item] = true
            //   setTimeout(()=>{hitCritical[item] = false}, 3600000)

          }
          //creates average humidity to send to client
          sensorObj[item].humidity = sensorObj[item].humidity.length > 1 ? parseFloat(((sensorObj[item].humidity.reduce((a, b) => a + b)) / humidLength).toFixed(2)) : sensorObj[item].humidity[0]
          //sends sms if humidity is in critical range

          // if (sensorObj[item].humidity < ranges.humRanges.criticalLow || sensorObj[item].humidity > ranges.humRanges.warningHigh) {
          //   SMS('Humidity', sensorObj[item].humidity, item, numbers)
          //   hitCritical[item] = true
          //   setTimeout(()=>{hitCritical[item] = false}, 3600000)
          // }
        } else {
          //determines length to use as divisor when computing averages of each array
          let ECLength = sensorObj[item].EC.length;
          let pHLength = sensorObj[item].pH.length;
          //creates average EC to send to client
          sensorObj[item].EC = sensorObj[item].EC.length > 1 ? parseFloat(((sensorObj[item].EC.reduce((a, b) => a + b)) / ECLength).toFixed(2)) : sensorObj[item].EC[0]
          //creates average pH to send to client
          sensorObj[item].pH = sensorObj[item].pH.length > 1 ? parseFloat(((sensorObj[item].pH.reduce((a, b) => a + b)) / pHLength).toFixed(2)) : sensorObj[item].pH[0]
        }
      }
      res.type('application/json').send(JSON.stringify(sensorObj));
    }
  })
}

//sends current ranges on initial client mount
async function getRanges(req, res) {
  res.type('application/json').send(JSON.stringify(ranges));
}

//sends current machine state, states will eventually live in their own databases
function getManagementData(req, res) {
  let manageObj = {
    fans: [`Section 1-2-11-12: ${fans['section_1_2_11_12'].on ? 'on' : 'off'}`, `Section 3-4-13-14: ${fans['section_3_4_13_14'].on ? 'on' : 'off'}`, `Section 5-6-15-16: ${fans['section_5_6_15_16'].on ? 'on' : 'off'}`, `Section 7-8: ${fans['section_7_8'].on ? 'on' : 'off'}`, `Section 9-10: ${fans['section_9_10'].on ? 'on' : 'off'}`],
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
  const queryApi = new InfluxDB({ url: process.env.URL, token: process.env.TOKENTWO }).getQueryApi(process.env.ORG);
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

async function clickQueryInflux(req, res) {
  let queryArray = []
  let querySensor = req.body.sensor
  let fluxQuery;
  const queryApi = new InfluxDB({ url: process.env.URL, token: process.env.TOKENTWO }).getQueryApi(process.env.ORG);
  if (req.body.type === 'tempHum') {
    fluxQuery = `from(bucket:"perm_data") |> range(start: -1h) |> filter(fn: (r) => r._measurement == "${querySensor}") |> filter(fn: (r) => r._field == "temperature" or r._field == "humidity")`
  } else {
    fluxQuery = `from(bucket:"perm_data") |> range(start: -1h) |> filter(fn: (r) => r._measurement == "${querySensor}") |> filter(fn: (r) => r._field == "EC" or r._field == "pH")`
  }

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

//sets ranges variable at server launch to the current ranges in Mongo Database
async function getStartData() {
  let firstRanges = await Ranges.find({})
  ranges = firstRanges[0].ranges
  let firstNumbers = await Numbers.find({})
  numbers = firstNumbers[0].numbers
  newDataBase.close()
}

//calls at server launch
getStartData()

setInterval(() => fanSchedule(), 120000)
setInterval(() => pumpSchedule(), 300000)
setInterval(() => lightSchedule(), 1200000)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.listen(port, () => { console.log(`Listening on port: ${port}`) });