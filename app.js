var express = require('express')
var proxy = require('http-proxy-middleware');
var history = require('connect-history-api-fallback');

var app = express()

// 找不到路由时，默认返回该'请求，非路径'下的内容，前端路由发现会监听URL，然后转换到对应模块
app.use(history({
  index: '/public/index.html'
}))

app.use('/message', proxy({
  target: 'http://localhost:8080',
  changeOrigin: true
}));

app.use('/public', express.static(__dirname + '/dist'));
app.use('/asset', express.static(__dirname + '/src/asset'));

app.listen(80, function () {
  console.log('Listening at http://localhost:80');
})
