
const  mongojs = require('mongojs');

const  db = mongojs("mongodb://172.17.0.1:27018", ['tags']);

const  ObjectId = require('mongojs').ObjectId;
const logger = require('logger-sharelatex');
const  metrics = require('metrics-sharelatex');

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
  module.exports = Tags = {
    async getUserTags(user_id, callback) {
      if (callback == null) {
        callback = function(err, user) {};
      }
      let doneFlag = false;
      let errFlag = false;
      let result = [];
      db.tags.find({"user_id": user_id},function(err, users){
        　　if( err ||!users) 
                errFlag = true;
        　　 else users.forEach(function(found){
                result.push(found);
        　　});
            doneFlag = true;
        　　});
      while(doneFlag === false)
      {
        await sleep(1);
      }
      if (errorFlag === true) {
        return { error: true, words: params.words, message: "error " };
      }
      return result;
      //return "Function getUserTags called success!"
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


