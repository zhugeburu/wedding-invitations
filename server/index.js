var express = require('express')
var bodyParser = require('body-parser')
var bless = require('./bless')
var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/bless/list', function (req, res) {
  bless.list(req, res)
});

app.post('/bless/add', function (req, res) {
  bless.add(req, res)
});

app.listen(8080, function () {
  console.log('Sever listening at http://localhost:8080');
})