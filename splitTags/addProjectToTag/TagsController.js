  const logger = require("logger-sharelatex");
  const TagsRepository = require("./Repositories/Tags");
  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  module.exports = {
    addProjectToTag: function(project_id, tag_id,user_id) {
      logger.log({
        user_id: user_id,
        tag_id: tag_id,
        project_id: project_id
      }, "adding project to tag");
      let doneFlag = false;
      let result;
      let fResult = TagsRepository.addProjectToTag(user_id, tag_id, project_id, function(error) {
        if (error != null) {
            result = "Error"
        }
        else
          result = "Success!";
        doneFlag = true;
      });
      while (doneFlag === false) {
        await sleep(1);
      }
      return {result: result, msg: fResult};
    }
  };

