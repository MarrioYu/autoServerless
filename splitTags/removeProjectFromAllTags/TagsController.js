  const logger = require("logger-sharelatex");
  const TagsRepository = require("./Tags");
  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  module.exports = {
    removeProjectFromAllTags: function(user_id, project_id) {
      logger.log({
        user_id: user_id,
        project_id: project_id
      }, "removing project from all tags");
      let result;
      let doneFlag = false;
      let fResult =  TagsRepository.removeProjectFromAllTags(user_id,project_id, function(err) {
        if(error)
          result = "Failed!";
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

