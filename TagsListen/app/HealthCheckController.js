
//indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

let  request = require("request");

const async = require("async");

  //settings = require("settings-sharelatex");

const  port = 3012;


const  ObjectId = require("mongojs").ObjectId;

  request = request.defaults({
    timeout: 3000
  });

  buildUrl = function(path) {
    return "http://localhost:" + port + path;
  };


  function check (callback) {
    const project_id = ObjectId();
    const user_id = ObjectId("5620bece05509b0a7a3cbc62");
    const tagName = "smoke-test-tag";
    return request.post({
      url: buildUrl("/user/" + user_id + "/tag"),
      json: {
        name: tagName
      }
    }, function(err, res, body) {
      if (err != null) {
        return callback(err);
      }
      if (res.statusCode !== 200) {
        return callback(new Error("unexpected statusCode: " + res.statusCode));
      }
      let tag_id = body._id;
      return request.post({
        url: buildUrl("/user/" + user_id + "/tag/" + tag_id + "/project/" + project_id)
      },/* Argument1 */ 
      function(err, res, body) {
        if (err != null) {
          return callback(err);
        }
        if (res.statusCode !== 204) {
          return callback(new Error("unexpected statusCode: " + res.statusCode));
        }
        return request.get({
          url: buildUrl("/user/" + user_id + "/tag"),
          json: true
        },/* Argument2 */
      function(err, res, tags) {
        var hasTag, i, len, ref, tag;
        if (err != null) {
          return callback(err);
        }
        if (res.statusCode !== 200) {
          return callback(new Error("unexpected statusCode: " + res.statusCode));
        }
        hasTag = false;
        for (i = 0, len = tags.length; i < len; i++) {
          tag = tags[i];
          if (ref = project_id.toString(), indexOf.call(tag.project_ids, ref) >= 0) {
            hasTag = true;
            break;
          }
        }
        if (!hasTag) {
          return callback(new Error("tag was not found in response"));
        }
        return request.del({
          url: buildUrl("/user/" + user_id + "/tag/" + tag_id),
          json: true
        }, function(err, res, body) {
          if (err != null) {
            return { msg : "Error!"}
          }
          return callback(err, res, body);
        });
      });
    });
  });
}

  module.exports = check;


