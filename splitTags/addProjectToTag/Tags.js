const  mongojs = require('mongojs');
const  db = mongojs("mongodb://172.17.0.1:27018/sharelatex", ['tags']);
const  ObjectId = require('mongojs').ObjectId;

  module.exports = Tags = {
    addProjectToTag: function(user_id, tag_id, project_id, callback) {
      var e, insertOperation, searchOps;
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
      insertOperation = {
        "$addToSet": {
          project_ids: project_id
        }
      };
      return db.tags.update(searchOps, insertOperation, callback);
    }
  };


