var DB = require('./db'),
  url = require("url"),
  util = require("util"),
  moment = require("moment"),
  querystring = require("querystring");

class Bless extends DB {
  save(request, response) {
    var str = '';

    request.on("data", function(chunk) {
      str += decodeURIComponent(chunk);
    });

    request.on("end", function() {
      var param = querystring.parse(str);
      var data = {};
      var now = moment().format('YYYY-MM-DD HH:mm:ss');

      data.author = param.author;
      data.msg = param.msg;
      data.dtime = now;

      db.save(data, function(result) {
        response.writeHead(200, {"Content-Type": "application/json"});
        response.write(util.format('%j', result));
        response.end();
      });
    });
  }

  list(request, response) {
    var param = url.parse(request.url, true).query;

    db.list(param.page, function(result) {
      response.writeHead(200, {"Content-Type": "application/json"});
      response.write(util.format('%j', result));
      response.end();
    });

  }
}

module.exports = new Bless({
  colName: 'bless'
})
