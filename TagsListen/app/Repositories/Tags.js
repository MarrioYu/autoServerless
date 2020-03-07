
  //Settings = require('settings-sharelatex');

  //logger = require('logger-sharelatex');
var ref;
const  mongojs = require('mongojs');
const  ObjectId = require('mongojs').ObjectId;
mongo: {
  url: "mongodb://" + (process.env["MONGO_HOST"] || "localhost") + "/sharelatex"
}
let  db = mongojs((ref = mongo) != null ? ref.url : void 0, ['tags']);
//  metrics = require('metrics-sharelatex');

  module.exports = Tags = {
    getUserTags: function(user_id, callback) {
      if (callback == null) {
        callback = function(err, user) {};
      }
      return db.tags.find({
        "user_id": user_id
      }, callback);
    },
    createTag: function(user_id, name, callback) {
      if (callback == null) {
        callback = function(err, tag) {};
      }
      return db.tags.insert({
        user_id: user_id,
        name: name,
        project_ids: []
      }, callback);
    },
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
    },
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
    },
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
    },
    deleteTag: function(user_id, tag_id, callback) {
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
      return db.tags.remove({
        _id: tag_id,
        user_id: user_id
      }, callback);
    },
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

  ['getUserTags', 'createTag', 'addProjectToTag', 'removeProjectFromTag', 'removeProjectFromAllTags', 'deleteTag', 'renameTag'].map(function(_method) {
    return metrics.timeAsyncMethod(Tags, _method, 'mongo.Tags', logger);
  });


