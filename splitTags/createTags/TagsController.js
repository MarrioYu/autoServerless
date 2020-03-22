  const logger = require("logger-sharelatex");
  const TagsRepository = require("./TagsTags");
  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  module.exports = {
    createTag: async function(user_id, name) {
      logger.log({
        user_id: user_id,
        project_id: project_id
      }, "creating project to tag");
      let doneFlag = false;
      let result;
      let fResult = TagsRepository.createTag(user_id, name,function(error,tags){
        if(error != null)
        {
          result = "Failed";
        }
        else
        {
          result = tags;
        }
        doneFlag = true;
      });
      while(doneFlag === false)
      {
        await sleep(1);
      }
      return {result: result,msg: fResult};
    }
  };

