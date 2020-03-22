  const logger = require("logger-sharelatex");
  const TagsRepository = require("./Tags");
  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  module.exports = {
    removeProjectFromTag: async function(project_id, tag_id,user_id) {
      logger.log({
        user_id: user_id,
        tag_id: tag_id,
        project_id: project_id
      }, "removing project form tag");
      let result;
      let doneFlag = false;
      let fResult = TagsRepository.removeProjectFromTag(user_id, tag_id, project_id, function(error) {
        if (error != null) {
          result = "Failed";
        }
        else  
          result = "Succeed";
        doneFlag = true;  
      });
      while (doneFlag === false) {
        await sleep(1);
      }
      return {result : result, fResult:  fResult};
    }
  };

