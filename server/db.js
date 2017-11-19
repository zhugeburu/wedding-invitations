var MongoClient = require('mongodb').MongoClient;
var url = require('./config')['dbUrl'];

class DB {
  constructor (obj) {
    this._$init(obj)
  }
  _$init ({ colName } = {}) {
    this._colName = colName
  }

  save (data, callback) {
    MongoClient.connect(url, function(err, db) {
      if (err) {
        console.log(err);
      } else {
        var collection = db.collection(this._colName);

        collection.insert(data, function(err, result) {
          if (err) {
            console.log(err);
          } else {
            console.log("insert success");
            console.log(data)
            callback && callback(result);
            db.close();
          }
        });
      }
    })
	}

	list ({ pageSize, pageNum }, callback) {
    MongoClient.connect(url, function(err, db) {
      if (err) {
        console.log(err);
      } else {
        var collection = db.collection(this._colName);

        collection.find({},{limit: pageSize, skip: (pageNum - 1) * pageSize}).sort({dtime:-1}).toArray(function(err, result) {
          if (err) {
            console.log(err);
          } else {
            console.log("get list success");
            console.log(result);
            callback && callback(result);
            db.close();
          }
        })
      }
    })
	}
}

module.exports = DB

