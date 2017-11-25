/**
 * @file 在服务端实现签名算法的逻辑
 */

var express = require('express')
var bodyParser = require('body-parser')
var sign = require('./sign.js')
var request = require('request-promise')
var app = express()

// 在“微信公众平台-开发-基本配置”页中获得AppID和AppSecret
const APPID = 'wx5235e3bb81bbb9e6'
const APPSECRET = 'fc53fec477d88a0b8456b5333a82db7a'

// accessToken和jsapiTicket有效期为7200s
const TASKTIMER = 7200000
let accessToken
let jsapiTicket

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())


/**
 * 获取access_token和jsapiTicket
 *
 * @return {Promise} promise 获取两个参数用于生成签名
 */
function getAccessToken () {
  return request(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`)
    .then(function (body) {
      accessToken = JSON.parse(body).access_token
      return request(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${accessToken}&type=jsapi`)
    })
    .then(function (body) {
      jsapiTicket = JSON.parse(body).ticket
    })
}

/**
 * 增加定时任务，刷新accessToken和jsapiTicket
 *
 */
setInterval(function () {
  getAccessToken()
}, TASKTIMER)

/**
 * 返回签名
 * @param {string} url 前端传递的域名用于生成签名
 */
function responseSignature (url) {
  //签名算法生成格式如下
  // var result = {
  //   jsapi_ticket: 'jsapi_ticket',
  //   nonceStr: '82zklqj7ycoywrk',
  //   timestamp: '1415171822',
  //   url: 'http://example.com',
  //   signature: '1316ed92e0827786cfda3ae355f33760c4f70c1f'
  // }
  let signature = sign(jsapiTicket, url)
  Object.assign(signature, {appId: APPID})
  return signature
}

app.get('/wechat/signature', function (req, res) {
  if (jsapiTicket == undefined) {
    getAccessToken().then(function () {
      res.json({
        code: 200,
        data: responseSignature(req.body.url)
      })
    }).catch(function () {
      res.json({
        code: -1,
        data: {}
      })
    })
  }
  else {
    res.json({
      code: 200,
      data: responseSignature(req.body.url)
    })
  }
})

app.listen(8081, function () {
  console.log('Wechat Sever listening at http://localhost:8081')
})