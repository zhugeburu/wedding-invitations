var express = require('express')
var proxy = require('http-proxy-middleware');

var app = express()

app.use('/message', proxy({
  target: 'http://localhost:8080',
  changeOrigin: true
}));

app.use('/public', express.static(__dirname + '/dist'));

app.use('/asset', express.static(__dirname + '/src/asset'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
})

app.get('*', function (req, res) {
  res.redirect('/');
})

app.listen(80, function () {
  console.log('Listening at http://localhost:80');
})