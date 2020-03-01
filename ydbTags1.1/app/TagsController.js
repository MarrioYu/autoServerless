
  const TagsRepository = require("./Repositories/Tags");
  module.exports = {
    getUserTags: function(user_id) {
      logger.log({
        user_id: user_id,
      }, " getting user's tags");
      let pass;
      let doneFlag = false;
      let result = TagsRepository.getUserTags(user_id,function(err){
        if(err)
          pass = {error : true, msg : "CreateTag Failed!"};
        else
          pass = {error : false, msg : "CreateTag Success!"};
        doneFlag = true;
      });
      while (doneFlag === false) {
        setTimeout(100);
      };
      return {result: result, pass: pass};
    },
    createTag: function(user_id, name,) {
      logger.log({
        user_id: user_id,
        tag_id: tag_id,
        project_id: project_id
      }, "creating project to tag");
      let doneFlag = false;
      let pass;
      let result = TagsRepository.createTag(user_id, name, function(error, tag) {
        if (error != null) {
          pass = {error : true, msg : "CreateTag Failed!", result : undefined};
        }
        else{
          let res = JSON(tag);
          pass = {error : false, msg : "CreateTag Failed!", result : res};
        }
      doneFlag = true;
      });
      while (doneFlag === false) {
        setTimeout(100)
      }
      return {result: result, pass: pass};
    },
    addProjectToTag: function(project_id, tag_id,user_id) {
      logger.log({
        user_id: user_id,
        tag_id: tag_id,
        project_id: project_id
      }, "adding project to tag");
      let doneFlag = false;
      let pass;
      let result = TagsRepository.addProjectToTag(user_id, tag_id, project_id, function(error) {
        if (error != null) {
          pass = {error : true ,msg : "Failed!" , code : undefined};
        }
        else
          pass = { error: false, msg: "Success!" , code: 204};
        doneFlag = true;
      });
      while (doneFlag === false) {
        setTimeout(100)
      }
      return {result: result, pass: pass};
    },
    removeProjectFromTag: function(project_id, tag_id,user_id) {
      logger.log({
        user_id: user_id,
        tag_id: tag_id,
        project_id: project_id
      }, "removing project form tag");
      let pass;
      let doneFlag = false;
      let result = TagsRepository.removeProjectFromTag(user_id, tag_id, project_id, function(error) {
        if (error != null) {
          pass = {error : true ,msg : "Failed!" , code : undefined};
        }
        else  
          pass = { error: false,msg: "Success!" , code: 204};
        doneFlag = true;  
      });
      while (doneFlag === false) {
        setTimeout(100)
      }
      return {result : result, pass:  pass}
    },
    removeProjectFromAllTags: function(user_id, project_id) {
      logger.log({
        user_id: user_id,
        project_id: project_id
      }, "removing project from all tags");
      let pass;
      let doneFlag = false;
      let result =  TagsRepository.removeProjectFromAllTags(user_id,project_id, function(err) {
        if(error)
          pass = {error : true ,msg : "Failed!"};
        else 
          pass = { error: false,  msg: "Success!"};
        doneFlag = true;
      });
      while (doneFlag === false) {
        setTimeout(100)
      }
      return {result: result, pass: pass};
    },
    renameTag: function(user_id, tag_id,name,) {
      logger.log({
        user_id: user_id,
        tag_id: tag_id,
        name: name
      }, "renaming tag");
      let pass;
      let doneFlag = false;
      let result = TagsRepository.renameTag(user_id, tag_id, name, function(error) {
        if (error != null) {
          pass = {error : true ,msg : "Failed!",  code : undefined};
        }
        else 
          pass = {  error: false, msg: "Success!" , code: 204};
        doneFlag = true;
      });
      while (doneFlag === false) {
        setTimeout(100)
      }
      return {result: result, pass: pass};
    },
    deleteTag: function(tag_id, user_id) {
      let pass;
      let doneFlag = false;
      let result = TagsRepository.deleteTag(user_id, tag_id, function(error) {
        if (error != null) {
          pass = {error : true ,msg : "deleteTag Failed!",   code : undefined};
        }
        else 
          pass = {error: false, msg : "deleteTag Success!" , code: 204};
        doneFlag = true;
      });
      //sleep();
      while (doneFlag === false) {
        setTimeout(100)
      }
      return {result: result, pass: pass};
    }
  };

