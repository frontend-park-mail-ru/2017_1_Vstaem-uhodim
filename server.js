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
      path += "about.html";
      break;
    case "/game":
      path += "game.html";
      break;
    case "/leaderboard":
      path += "leaderboard.html";
      break;
    case "/login":
      path += "login.html";
      break;
    case "/signup":
      path += "signup.html";
      break;
    default:
      if (url.indexOf("..") == -1) path += url.slice(1);
      break;
  }
  content = fs.readFileSync(path, "utf8");
  resp.write(content);
  resp.end();
};

const server = http.createServer(worker);

const port = process.env.PORT || 3000;

server.listen(3000, () => { console.log('Сервер запущен!'); });
