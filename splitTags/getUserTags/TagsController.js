  const logger = require("logger-sharelatex");
  const TagsRepository = require("./Repositories/Tags");
  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  module.exports = {
    getUserTags: function(user_id) {
      logger.log({
        user_id: user_id,
      }, " getting user's tags");
      let result;
      let doneFlag = false;
      let functionResult = TagsRepository.getUserTags(user_id,function(err,tags){
      if(err != null)
      {    
        result = "FAILED";
      }
      else
      {	
        result = JSON(tags);
      }
      doneFlag = true;
      });
      while (doneFlag === false) {
        await sleep(1); 
      };
      return {result: result, msg:functionResult};
    }
  };

