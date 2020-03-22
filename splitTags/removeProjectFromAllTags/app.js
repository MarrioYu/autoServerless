//const logger = require('logger-sharelatex');
//logger.initialize("tags-sharelatex");
const  controller = require("./TagsController");

function testLocally(params) {
  let user_id = params.user_id || "5620bece05509b0a7a3cbc63";
  let project_id = params.project_id || "";
    return  controller.removeProjectFromAllTags(user_id,project_id);
}

exports.main = testLocally
