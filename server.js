"use strict";

const http = require("http");
const fs = require("fs");

const worker = function (req, resp) {
  const url = req.url;
  let content;

  switch(url) {
    case "/":
      content = fs.readFileSync("static/index.html", "utf8");
      resp.write(content);
      resp.end();
      break;
    case "/about":
      content = fs.readFileSync("static/about.html", "utf8");
      resp.write(content);
      resp.end();
      break;
    case "/game":
      content = fs.readFileSync("static/game.html", "utf8");
      resp.write(content);
      resp.end();
      break;
    case "/leaderboard":
      content = fs.readFileSync("static/leaderboard.html", "utf8");
      resp.write(content);
      resp.end();
      break;
    case "/login":
      content = fs.readFileSync("static/login.html", "utf8");
      resp.write(content);
      resp.end();
      break;
    case "/signup":
      content = fs.readFileSync("static/signup.html", "utf8");
      resp.write(content);
      resp.end();
      break;
    default:
      if (url.slice(0, 4) == "/css" || url.slice(0, 8) == "/scripts") {
      content = fs.readFileSync(`static${url}`, "utf8");
      resp.write(content);
      resp.end();
    }
  }
};

const server = http.createServer(worker);

const port = process.env.PORT || 3000;

server.listen(3000);

console.log('Сервер запущен!');
