
const  mongojs = require('mongojs');

const  db = mongojs("mongodb://172.17.0.1:27018/sharelatex", ['tags']);

const  ObjectId = require('mongojs').ObjectId;
const logger = require('logger-sharelatex');
const  metrics = require('metrics-sharelatex');

  module.exports = Tags = {
    removeProjectFromAllTags: function(user_id, project_id, callback) {
      var deleteOperation, searchOps;
      searchOps = {
        user_id: user_id
      };
      deleteOperation = {
        "$pull": {
          project_ids: project_id
        }
      };
      return db.tags.update(searchOps, deleteOperation, {
        multi: true
      }, callback);
    }
  };


