"use strict";

const http = require("http");
const fs = require("fs");

const worker = function (req, resp) {
  let url = req.url;
  let content;
  let path = "static/";

  switch(url) {
    case "/":
      url = '/index';
    case "/tests":
      path += `${url.slice(1)}.html`;
      break;
    default:
      if (url.indexOf("..") == -1) path += url.slice(1);
      break;
  }
  if(fs.existsSync(path)) {
    content = fs.readFileSync(path, "utf8");
  }
  else {
    // 404
    content = `Path '${path}' is not found!`;
    resp.writeHead(404);
  }
  resp.write(content);
  resp.end();
};

const server = http.createServer(worker);
const port = process.env.PORT || 80;

server.listen(port, () => { console.log('Сервер запущен!'); });
