
  const TagsRepository = require("./Repositories/Tags");
  module.exports = {
    getUserTags: function(req, res, next) {
      let user_id = req.params.user_id;

      return TagsRepository.getUserTags(user_id, function(error, tags) {
        if (error != null) {
          return next(error);
        }
        return res.json(tags);
      });
    },
    createTag: function(req, res, next) {
      let user_id = req.params.user_id;
      let name = req.body.name;

      return TagsRepository.createTag(user_id, name, function(error, tag) {
        if (error != null) {
          return next(error);
        }
        return res.json(tag);
      });
    },
    addProjectToTag: function(req, res, next) {
      var project_id, ref, tag_id, user_id;
      ref = req.params, user_id = ref.user_id, project_id = ref.project_id, tag_id = ref.tag_id;
      
      return TagsRepository.addProjectToTag(user_id, tag_id, project_id, function(error) {
        if (error != null) {
          return next(error);
        }
        return res.sendStatus(204);
      });
    },
    removeProjectFromTag: function(req, res, next) {
      var project_id, ref, tag_id, user_id;
      ref = req.params, user_id = ref.user_id, project_id = ref.project_id, tag_id = ref.tag_id;
      return TagsRepository.removeProjectFromTag(user_id, tag_id, project_id, function(error) {
        if (error != null) {
          return next(error);
        }
        return res.sendStatus(204);
        
      });
    },
    removeProjectFromAllTags: function(req, res, next) {
      return TagsRepository.removeProjectFromAllTags(req.params.user_id, req.params.project_id, function(err, tags) {
        if(err != null)
        {
          return next(err);
        }
        return res.send(tags);
      });
      
    },
    renameTag: function(req, res, next) {
      var name, ref, tag_id, user_id;
      ref = req.params, user_id = ref.user_id, tag_id = ref.tag_id;
      name = req.body.name;
      return TagsRepository.renameTag(user_id, tag_id, name, function(error) {
        if (error != null) {
          return next(error);
        }
        return res.sendStatus(204);
      });
    },
    deleteTag: function(req, res, next) {
      var ref, tag_id, user_id;
      ref = req.params, user_id = ref.user_id, tag_id = ref.tag_id;
      return TagsRepository.deleteTag(user_id, tag_id, function(error) {
        if (error != null) {
          return next(error);
        }
        return res.sendStatus(204);
      });
    }
  };

