
const  mongojs = require('mongojs');

const  db = mongojs("mongodb://172.17.0.1:27018/sharelatex", ['tags']);

const  ObjectId = require('mongojs').ObjectId;
const logger = require('logger-sharelatex');
const  metrics = require('metrics-sharelatex');

  module.exports = Tags = {
    renameTag: function(user_id, tag_id, name, callback) {
      var e;
      if (callback == null) {
        callback = function(error) {};
      }
      try {
        tag_id = ObjectId(tag_id);
      } catch (error1) {
        e = error1;
        return callback(e);
      }
      return db.tags.update({
        _id: tag_id,
        user_id: user_id
      }, {
        $set: {
          name: name
        }
      }, callback);
    }
  };


