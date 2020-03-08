
  let  http = require('http');

  http.globalAgent.maxSockets = 300;

  module.exports = Settings = {
    internal: {
      docstore: {
        port: 3016,
        host: "localhost"
      }
    },
    mongo: {
      url: "mongodb://172.17.0.1:27018/sharelatex"
    },
    docstore: {
      healthCheck: {
        project_id: ""
      }
    },
    max_doc_length: 2 * 1024 * 1024
  };

  if ((process.env['AWS_ACCESS_KEY_ID'] != null) && (process.env['AWS_SECRET_ACCESS_KEY'] != null) && (process.env['AWS_BUCKET'] != null)) {
    Settings.docstore.s3 = {
      key: process.env['AWS_ACCESS_KEY_ID'],
      secret: process.env['AWS_SECRET_ACCESS_KEY'],
      bucket: process.env['AWS_BUCKET']
    };
  }

