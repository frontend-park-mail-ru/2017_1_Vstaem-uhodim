"use strict";

const http = require("http");
const fs = require("fs");

const worker = function (req, resp) {
	let url = req.url;
	let content;
	let path = "static/";

	if (url.indexOf('?') !== -1) {
		url = url.slice(0, url.indexOf('?'));
	}

	switch (url) {
		case "/":
		case "/leaderboard":
		case "/about":
		case "/game":
		case "/login":
		case "/signup":
		case "/logout":
			url = '/index';
		case "/tests":
			path += `${url.slice(1)}.html`;
			break;
		default:
			if (url.indexOf("..") == -1) path += url.slice(1);
			break;
	}
	if (fs.existsSync(path)) {
		content = fs.readFileSync(path, "utf8");
	}
	else {
		// 404
		content = `Path '${path}' is not found!`;
		resp.writeHead(404);
	}

	if (url.slice(-2) === "js") {
		resp.writeHead(200, {"Content-Type": "application/x-javascript"});
	}
	resp.write(content);
	resp.end();
};

const server = http.createServer(worker);
const port = process.env.PORT || 80;

server.listen(port, () => {
	console.log('Сервер запущен!');
});
