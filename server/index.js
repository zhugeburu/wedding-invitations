var express = require('express')
var app = express()

app.get('/bless/list', function (req, res) {
  res.send('bless list');
});

app.post('/bless/add', function (req, res) {
  res.send('bless add');
});

app.listen(8080, function () {
  console.log('Sever listening at http://localhost:8080');
})