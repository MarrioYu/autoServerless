//const logger = require('logger-sharelatex');
//logger.initialize("tags-sharelatex");
const  controller = require("./app/TagsController");

function testLocally(params = {}) {
  let user_id = params.user_id || "5620bece05509b0a7a3cbc63";
    return  controller.getUserTags(user_id);
}

exports.main = testLocally
