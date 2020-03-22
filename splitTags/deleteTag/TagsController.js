  const logger = require("logger-sharelatex");
  const TagsRepository = require("./Tags");
  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  module.exports = {
    deleteTag: function(tag_id, user_id) {
      let result;
      let doneFlag = false;
      let fResult = TagsRepository.deleteTag(user_id, tag_id, function(error) {
        if (error != null) {
          result = "deleteTag Failed!";
        }
        else 
          result = "deleteTag Success!";
        doneFlag = true;
      });
      while (doneFlag === false) {
        await sleep(1);
      }
      return {result: result, fResult: fResult};
    }
  };

