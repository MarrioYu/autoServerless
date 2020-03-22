//const logger = require('logger-sharelatex');
//logger.initialize("tags-sharelatex");
const tagjs = require("./app/Repositories/Tags");
const  controller = require("./app/TagsController");

function testLocally(params = {}) {
  let user_id = params.user_id || "5620bece05509b0a7a3cbc63";
  let name = params.name || "TagSharelatex1";
    return  controller.createTag(user_id,name);
}

exports.main = testLocally
