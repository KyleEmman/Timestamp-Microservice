// index.js
// where your node app starts
const moment = require('moment')
// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.set('port', 3000);

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get("/api", (req, res) => {
  const currentTime = new Date()
  const currentTimeUnix = parseInt((new Date().getTime() / 1000).toFixed(0))
  res.json({
    unix: currentTimeUnix,
    utc: currentTime
  })
})

app.get("/api/:date", (req, res) => {
  const date = new Date(req.params.date)
  // res.json({error : "Invalid Date"})
  const validUnix = moment(req.params.date, 'X', true).isValid()
  if (validUnix) {
    res.json({
      unix: req.params.date,
      utc: moment.unix(req.params.date).toDate().toUTCString()
    })
  }
  else if (date.toUTCString() != "Invalid Date") {
    res.json({
      unix: parseInt((new Date(req.params.date).getTime() / 1000).toFixed(0)),
      utc: date.toUTCString()
    })
  }
  else {
    res.json({error : "Invalid Date"})
  }
})
