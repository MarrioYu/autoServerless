const Settings = require('settings-sharelatex');

const logger = require('logger-sharelatex');
const logger.initialize("tags-sharelatex");
const tagjs = require("./app/Repositories/Tags");
//const  express = require('express');
const  app = express();
const  controller = require("./app/js/TagsController");
const  Path = require("path");

const  HealthCheckController = require("./app/js/HealthCheckController");

/*
  app.get('/status', function(req, res) {
    return res.send('tags sharelatex up');
  });

  app.get('/health_check', function(req, res) {
    return HealthCheckController.check(function(err) {
      if (err != null) {
        logger.err({
          err: err
        }, "error performing health check");
        return res.send(500);
      } else {
        return res.send(200);
      }
    });
  });
*/

function testLocally(params = {}) {
  let user_id = params.user_id || "5620bece05509b0a7a3cbc62";
  let name = params.name || "TagSharelatex";
  let tag_id = params.tag_id;
  const operation = params.operation;
  
  if(operation === "getTags")
    return controller.getUserTags(user_id);
  else if (operation === "createTag")
    return controller.createTag(user_id,name);
  else if (operation === "rename")
    return controller.renameTag(user_id, tag_id,name);
  else if(operation === "addProject")
    return controller.addProjectToTag(project_id, tag_id,user_id);
  else if(operation === "rmProject")
    return controller.removeProjectFromTag(project_id, tag_id,user_id);
  else if(operation === "rmAllProject")
    return controller.removeProjectFromAllTags(project_id, tag_id,user_id);
  else if(operation === "deleteTag")
    return controller.deleteTag(user_id,tag_id);
  else if(operation === 'status')
    return 'tags sharelatex up';
  else
    return undefined;
}

exports.main = testLocally
