const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const Influx = require('influx');
const http = require('http');

app.use(express.static(path.join(__dirname, '/client/build')));

// ------------- For parsing data once we have the database ---------------------------- //

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

// ------------------------------------------------------------------------------------- //

// ----- this is our database set-up ----- can't test until we get the log in info ----- //

/*const influx = new Influx.InfluxDB({
    host: //link to our database,
    database: //name of the database we are using,
    schema: [
      {
        measurement: // this will be our 'collection'.. it's the table name,
        fields: {
          //this is where our main data will live in the schema
        },
        tags: [
          //used to organize the data
        ]
      }
    ]
  })

  influx.getDatabaseNames()
  .then(names => {
    if (!names.includes(//database name)) {
      return influx.createDatabase(//database name);
    }
  })
  .then(() => {
    http.createServer(app).listen(port, function () {
      console.log(`Listening on ${port} 3000`)
    })
  })
  .catch(err => {
    console.error(`Error creating Influx database!`);
  })
  */


// ----------------------------------------------------------------------------------- //



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});
//sets server to listen on defined port, only used for testing before we  have the acutal database
app.listen(port, () => { console.log(`Listening on port: ${port}`) });