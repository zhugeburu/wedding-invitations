var MongoClient = require('mongodb').MongoClient;
var url = require('./config')['dbUrl'];
var moment = require("moment");

class DB {
  constructor (obj) {
    this._$init(obj)
  }
  _$init ({ colName } = {}) {
    this._colName = colName
  }

  add (data) {
    var that = this
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, function(err, db) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          var collection = db.collection(that._colName);

          collection.insert(data, function(err, result) {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              console.log("add success", moment().format('YYYY-MM-DD HH:mm:ss'));
              resolve(result)
              db.close();
            }
          });
        }
      })
    })
	}

	list ({ pageSize, pageNum }) {
    var that = this
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, function(err, db) {
        if (err) {
          console.log(err);
          reject(err)
        } else {
          var collection = db.collection(that._colName);

          collection.find({},{limit: pageSize, skip: (pageNum - 1) * pageSize}).sort({time: -1}).toArray(function(err, result) {
            if (err) {
              console.log(err);
              reject(err)
            } else {
              console.log("get list success", moment().format('YYYY-MM-DD HH:mm:ss'));
              resolve(result)
              db.close();
            }
          })
        }
      })
    })
	}
}

module.exports = DB

