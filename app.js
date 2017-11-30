var express = require('express')
var proxy = require('http-proxy-middleware');
var history = require('connect-history-api-fallback');

var app = express()

app.use('/bless', proxy({
  target: 'http://localhost:8080',
  changeOrigin: true
}));

app.use('/wechat', proxy({
  target: 'http://localhost:8081',
  changeOrigin: true
}));

// 微信开发者-JS接口安全域名
app.get('/MP_verify_GpkFipVh3BwHq8kO.txt', function (req, res) {
  var options = {
    root: __dirname,
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };
  var fileName = 'MP_verify_GpkFipVh3BwHq8kO.txt';
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });
})

// 找不到路由时，默认返回该'请求，非路径'下的内容，前端路由发现会监听URL，然后转换到对应模块
app.use(history({
  index: '/public/index.html'
}))


app.use('/public', express.static(__dirname + '/dist'));
app.use('/asset', express.static(__dirname + '/src/asset'));

app.listen(80, function () {
  console.log('Listening at http://localhost:80');
})
