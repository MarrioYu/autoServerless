//const logger = require('logger-sharelatex');
//logger.initialize("tags-sharelatex");
const  controller = require("./TagsController");

function testLocally(params = {}) {
  let user_id = params.user_id || "5620bece05509b0a7a3cbc63";
  let name = params.name || "TagSharelatex1";
  let tag_id = params.tag_id || "";
    return controller.renameTag(user_id,tag_id,name);
}

exports.main = testLocally
