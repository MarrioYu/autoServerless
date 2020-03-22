
const  mongojs = require('mongojs');

const  db = mongojs("mongodb://172.17.0.1:27018/sharelatex", ['tags']);

const  ObjectId = require('mongojs').ObjectId;

const  metrics = require('metrics-sharelatex');

  module.exports = Tags = {
    removeProjectFromTag: function(user_id, tag_id, project_id, callback) {
      var deleteOperation, e, searchOps;
      if (callback == null) {
        callback = function(error) {};
      }
      try {
        tag_id = ObjectId(tag_id);
      } catch (error1) {
        e = error1;
        return callback(e);
      }
      searchOps = {
        _id: tag_id,
        user_id: user_id
      };
      deleteOperation = {
        "$pull": {
          project_ids: project_id
        }
      };
      return db.tags.update(searchOps, deleteOperation, callback);
    }
  };


