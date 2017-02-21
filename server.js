"use strict";

const http = require("http");
const fs = require("fs");

const worker = function (req, resp) {
  const url = req.url;
  let content;
  let path = "static/";

  switch(url) {
    case "/":
      path += "index.html";
      break;
    case "/about":
    case "/game":
    case "/leaderboard":
    case "/login":
    case "/signup":
      path += `${url.slice(1)}.html`;
      content = fs.readFileSync(path, "utf8");
      break;
    default:
      if (url.indexOf("..") == -1) path += url.slice(1);
      break;
  }
  if (fs.existsSync(path)) {
    content = fs.readFileSync(path, "utf8");
  }
  else {
    content = `unknown url \"${url}\"`;
    resp.writeHead(200, {'Content-Type': 'text/plain'});
  }
  resp.write(content);
  resp.end();
};

const server = http.createServer(worker);

const port = process.env.PORT || 3000;

server.listen(port, () => { console.log('Сервер запущен!'); });
