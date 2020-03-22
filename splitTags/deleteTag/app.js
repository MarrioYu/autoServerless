//const logger = require('logger-sharelatex');
//logger.initialize("tags-sharelatex");
const tagjs = require("./app/Repositories/Tags");
const  controller = require("./app/TagsController");

function testLocally(params = {}) {
  let user_id = params.user_id || "5620bece05509b0a7a3cbc63";
  let tag_id = params.tag_id || ""
    return  controller.deleteTag(user_id,tag_id);
}

exports.main = testLocally
