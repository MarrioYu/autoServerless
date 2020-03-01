
const async = require("async");
const  ObjectId = require("mongojs").ObjectId;
const  TagsController = require("./TagsController");

module.exports = {
  check: function() {
    let project_id = ObjectId();
    user_id = "5620bece05509b0a7a3cbc62";
    tagName = "smoke-test-tag";
    tag_id = ObjectId()
      //1.createTag
      //2.create project in tag
      //3.Failed executing list tags
      //4.delete tags health check
      

    let msg1 = TagsController.createTag(user_id,tagName);
    let msg2 = TagsController.addProjectToTag(project_id,tag_id,user_id);
    let msg3 = TagsController.getUserTags(user_id);
    let msg4 = TagsController.deleteTag(tag_id,user_id);
    const message1 = msg1.pass.msg;
    const message2 = msg2.pass.msg;
    const message3 = msg3.pass.msg;
    const message4 = msg4.pass.msg;
    return {
      functionName1: "createTag" , status1 : message1,
      functionName2: "addProjectToTag" , status2 : message2,
      functionName3: "getUserTags" , status3 : message3,
      functionName4: "deleteTag" , status4 : message4
    }
  }
}


