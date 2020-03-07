
 

  //Settings = require('settings-sharelatex');

  //logger = require('logger-sharelatex');

  //logger.initialize("tags-sharelatex");

const  express = require('express');

const  app = express();

const  controller = require("./app/js/TagsController");

const  Path = require("path");

//const  metrics = require("metrics-sharelatex");

//const  metrics.initialize("tags");

//  metrics.memory.monitor(logger);

const  HealthCheckController = require("./app/js/HealthCheckController");

const host = "localhost";
const port = 3012;

app.listen(port, host, function() {
  return  "tags starting up, listening on " + host + ":" + port;
});

  app.configure(function() {
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(metrics.http.monitor(logger));
    return app.use(express.errorHandler());
  });

  

  

  app.post('/user/:user_id/tag/${tag_id}/rename', controller.renameTag);

  app.del('/user/:user_id/tag/${tag_id}', controller.deleteTag);

  app.post('/user/:user_id/tag/${tag_id}/project/:project_id', controller.addProjectToTag);

  app.del('/user/:user_id/tag/${tag_id}/project/:project_id', controller.removeProjectFromTag);

  app.del('/user/:user_id/project/:project_id', controller.removeProjectFromAllTags);

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

  app.get('*', function(req, res) {
    return res.send(404);
  });


  function testLocally(params = {}) {
    let user_id = params.user_id || "5620bece05509b0a7a3cbc62";
    let name = params.name || "TagSharelatex";
    let tag_id = params.tag_id;
    const operation = params.operation;
    const opts = { timeout: 1000 * 20 }
    
    if(operation === "getTags")
    {
      opts.url = `http://localhost:3012/user/${user_id}/tags`;
      let postReq = promisify(request.post);
      return (async () => {
        let result = await postReq(opts);
        return { result: { tags: result.body, status: "passed" } };
      })()
    }
    else if (operation === "createTag")
    {
      opts.url = `http://localhost:3012/user/${user_id}/tag`;
      let postReq = promisify(request.post);
      return (async () => {
        let result = await postReq(opts);
        return { result: { tags: result.body, status: "passed" } };
      })()
    }
      
    else if (operation === "rename")
    {
      opts.url = `http://localhost:3012/user/${user_id}/tag/${tag_id}/rename`;
      let postReq = promisify(request.post);
      return (async () => {
        let result = await postReq(opts);
        let statusCode = result.statusCode
        if(statusCode === 204)
        {
          return { result: { tags: result.body, status: "passed" } };
        }
          return { result: { tags: undefined, status: "error" } }
      })()
    }
      
    else if(operation === "addProject")
    {
      opts.url = `http://localhost:3012/user/${user_id}/tag/${tag_id}/project/:project_id`;
      let postReq = promisify(request.post);
      return (async () => {
        let result = await postReq(opts);
        let statusCode = result.statusCode
        if(statusCode === 204)
        {
          return { result: {  status: "passed" } };
        }
          return { result: { status: "error" } }
      })()
    }
    else if(operation === "rmProject")
    {
      app.del('/user/:user_id/tag/${tag_id}/project/:project_id', controller.removeProjectFromTag);
      opts.url = `http://localhost:3012/user/${user_id}/tag/${tag_id}/project/:project_id`;
      let delReq = promisify(request.del);
      return (async () => {
        let result = await delReq(opts);
        let statusCode = result.statusCode
        if(statusCode === 204)
        {
          return { result: {  status: "passed" } };
        }
          return { result: { status: "error" } }
      })()
    }
    else if(operation === "rmAllProject")
    {
      opts.url = `http://localhost:3012/user/${user_id}/project/:project_id`;
      let delReq = promisify(request.del);
      return (async () => {
        let result = await delReq(opts);
        let statusCode = result.statusCode
        if(statusCode === 204)
        {
          return { result: { res:result.body, status: "passed" } };
        }
          return { result: {  status: "error" } }
      })()
    }
    else if(operation === "deleteTag")
    {
      opts.url = `http://localhost:3012/user/${user_id}/tag/${tag_id}`;
      let delReq = promisify(request.del);
      return (async () => {
        let result = await delReq(opts);
        let statusCode = result.statusCode
        if(statusCode === 204)
        {
          return { result: { res:result.body, status: "passed" } };
        }
          return { result: {  status: "error" } }
      })()
    }
    else if(operation === 'status')
      return 'tags sharelatex up';
    else
      return undefined;
  }
  
  exports.main = testLocally
  
