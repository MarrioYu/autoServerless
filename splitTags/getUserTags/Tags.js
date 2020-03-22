
const  mongojs = require('mongojs');

const  db = mongojs("mongodb://172.17.0.1:27018/sharelatex", ['tags']);

const  ObjectId = require('mongojs').ObjectId;
const logger = require('logger-sharelatex');
const  metrics = require('metrics-sharelatex');

  module.exports = Tags = {
    getUserTags:function(user_id, callback) {
      if (callback == null) {
        callback = function(err,tags) {};
      }
      return db.tags.find({"user_id": user_id},function(){
        callback(err,tags);
        db.close();
      });
  }
};


