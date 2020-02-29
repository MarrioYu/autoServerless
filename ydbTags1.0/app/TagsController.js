
  const TagsRepository = require("./Repositories/Tags");
  module.exports = {
    getUserTags: function(user_id) {
      let _id = user_id;
      return TagsRepository.getUserTags(_id);
    },
    createTag: function(user_id, name,) {
      let _id = user_id;
      let _name = name;

      return TagsRepository.createTag(user_id, name, function(error, tag) {
        if (error != null) {
          return {error : true ,msg : "Failed!"};
        }
        return JSON(tag);
      });
    },
    addProjectToTag: function(project_id, tag_id,user_id,) {
      return TagsRepository.addProjectToTag(user_id, tag_id, project_id, function(error) {
        if (error != null) {
          return {error : true ,msg : "Failed!"};
        }
        return { message: "Success!" , code: 204};
      });
    },
    removeProjectFromTag: function(project_id, tag_id,user_id) {
      return TagsRepository.removeProjectFromTag(user_id, tag_id, project_id, function(error) {
        if (error != null) {
          return {error : true ,msg : "Failed!"};
        }
        return { message: "Success!" , code: 204};
        
      });
    },
    removeProjectFromAllTags: function(user_id, project_id, next) {
      logger.log({
        user_id: user_id,
        project_id: project_id
      }, "removing project from all tags");
      return TagsRepository.removeProjectFromAllTags(user_id,project_id, function(err) {
        if(error)
          return {error : true ,msg : "Failed!"};
        return { message: "Success!"};
      });
      
    },
    renameTag: function(user_id, tag_id,name,) {
      logger.log({
        user_id: user_id,
        tag_id: tag_id,
        name: name
      }, "renaming tag");
      return TagsRepository.renameTag(user_id, tag_id, name, function(error) {
        if (error != null) {
          return {error : true ,msg : "Failed!"};
        }
        return { message: "Success!" , code: 204};
      });
    },
    deleteTag: function(tag_id, user_id) {
      return TagsRepository.deleteTag(user_id, tag_id, function(error) {
        if (error != null) {
          return {error : true ,msg : "Failed!"};
        }
        return { message: "Success!" , code: 204};
      });
    }
  };

