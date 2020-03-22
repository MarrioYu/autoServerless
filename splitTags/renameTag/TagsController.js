  const logger = require("logger-sharelatex");
  const TagsRepository = require("./Tags");
  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  module.exports = {
    renameTag: function(user_id, tag_id,name) {
      logger.log({
        user_id: user_id,
        tag_id: tag_id,
        name: name
      }, "renaming tag");
      let result;
      let doneFlag = false;
      let fResult = TagsRepository.renameTag(user_id, tag_id, name, function(error) {
        if (error != null) {
          result = "Failed!";
        }
        else 
          result = "Success!";
        doneFlag = true;
      });
      while (doneFlag === false) {
        await sleep(1);
      }
      return {result: result, fResult: fResult};
    }
  };

