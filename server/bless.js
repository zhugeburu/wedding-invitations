var DB = require('./db'),
  moment = require("moment");

class Bless extends DB {
  add(req, res) {
    super.add({
      name: req.body.name,
      content: req.body.content,
      time: moment().format('YYYY-MM-DD HH:mm')
    }).then(function(result) {
      res.json({
        code: 200,
        data: true
      })
    }).catch(function (error) {
      res.json({
        code: -1,
        data: false,
        msg: '请稍后，服务器好像有点小情绪~'
      })
    });
  }

  list(req, res) {
    super.list({
      pageSize: req.query.pageSize,
      pageNum: req.query.pageNum
    }).then(function(result) {
      res.json({
        code: 200,
        data: result
      })
    }).catch(function (error) {
      res.json({
        code: -1,
        data: [],
        msg: '请稍后，服务器好像有点小情绪~'
      })
    });

  }
}

module.exports = new Bless({
  colName: 'bless'
})
