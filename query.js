require('dotenv').config();
// const {InfluxDB} = require('@influxdata/influxdb-client');

// // ----------------- Queries data to InfluxDB example ---------------------------------- //


// async function buildSensorObject() {
//   let queryArray = []
//   let querySensor = 'sensor1'
//   const queryApi = new InfluxDB({url: process.env.URL, token: process.env.TOKENTWO}).getQueryApi(process.env.ORG);
//   const fluxQuery = `from(bucket:"perm_data") |> range(start: -1h) |> filter(fn: (r) => r._measurement == "${querySensor}") |> filter(fn: (r) => r._field == "temperature" or r._field == "humidity")`

//   await queryApi.queryRows(fluxQuery, {
//     next(row, tableMeta) {
//       const o = tableMeta.toObject(row)
//       queryArray.push(o);
//     },
//       error(error) {
//         console.error(error)
//         console.log('\n Finished ERROR')
//       },
//       complete() {
//         console.log(queryArray)
//         console.log('\nFinished SUCCESS')
//       }
//     })
// }

// buildSensorObject();

const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://joshldowns:${process.env.PASSWORD}@josh-d-blog-archive-wxvci.mongodb.net/ceres-greens?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})

const newDataBase = mongoose.connection;
newDataBase.on('error', (err)=>{console.log('Something went wrong:',err)});
newDataBase.once('open', ()=>{console.log('Connected...')});

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

const numberSchema = new mongoose.Schema({
  numbers: [{name: String, email: String, number: String}]
})

const Numbers = mongoose.model('Numbers', numberSchema, 'sms')

async function addRange(doc) {
  let newRange = Ranges({
    ranges: {
      tempRanges: {
        criticalLow: 64,
        warningLow: 66,
        normal: 70,
        warningHigh: 72
      },
      humRanges: {
        criticalLow: 50,
        warningLow: 52,
        normal: 56,
        warningHigh: 58
      },
      germRmECRanges: {
        criticalLow: .4,
        warningLow: .6,
        normal: 1,
        warningHigh: 1.2
      },
      germRmpHRanges: {
        criticalLow: 5.8,
        warningLow: 5.9,
        normal: 6.3,
        warningHigh: 6.4
      },
      zone1ECRanges: {
        criticalLow: .8,
        warningLow: .9,
        normal: 1.4,
        warningHigh: 1.6
      },
      zone1pHRanges: {
        criticalLow: 5.7,
        warningLow: 5.8,
        normal: 6.1,
        warningHigh: 6.3
      },
      zone2ECRanges: {
        criticalLow: .8,
        warningLow: 1,
        normal: 1.2,
        warningHigh: 1.4
      },
      zone2pHRanges: {
        criticalLow: 5.6,
        warningLow: 5.8,
        normal: 6.2,
        warningHigh: 6.4
      },
      zone3ECRanges: {
        criticalLow: 1.6,
        warningLow: 1.8,
        normal: 2.4,
        warningHigh: 2.6
      },
      zone3pHRanges: {
        criticalLow: 5.6,
        warningLow: 5.8,
        normal: 6.2,
        warningHigh: 6.4
      }
    }
  })

  newRange.save((err, newPost) => {
      if(err) {
          return console.err(err)
      }
      console.log('Success! Added to Database:' , newRange)
      newDataBase.close()
  })
}

//addRange()

async function addNumbers() {
  let newNumbers = Numbers({
    numbers: [{name: 'Josh', email: 'email@email.com', number: '+19076120335'}, {name: 'Josh', email: 'email@email.com', number: '+18023428093'}, {name: 'G.J.', email: 'email@email.com', number: '+18023380386'}, {name: 'Sara', email: 'email@email.com', number: '+18022338198'}]
  })

  newNumbers.save((err, newNumbers) => {
    console.log('success')
    newDataBase.close();
  })
}

//addNumbers()

async function showCollection () {
  let posts = await Numbers.find({})
  console.log(posts[0].numbers[0]);
  newDataBase.close()
}

showCollection()