
const  mongojs = require('mongojs');

const  db = mongojs("mongodb://172.17.0.1:27018/sharelatex", ['tags']);


  module.exports = Tags = {
    createTag: function(user_id, name,callback) {
      if(callback === null)
      {
         callback = function(error,tags){};
      }
      return db.tags.insert({
        user_id: user_id,
        name: name,
        project_ids: []
      },callback);
    }
  };


