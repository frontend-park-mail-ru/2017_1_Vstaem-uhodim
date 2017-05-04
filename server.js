"use strict";

const http = require("http");
const fs = require("fs");

const worker = function (req, resp) {
	let url = req.url;
	let type = null;
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
		let mtype;
		let ext = path.split(".")[path.split(".").length - 1];

		switch (ext) {
			case "png":
				mtype = "image/png";
				type = "binary";
				break;
			case "woff":
				mtype = "application/font-woff";
				break;
			case "woff2":
				mtype = "application/font-woff2";
				break;
			case "ttf":
				mtype = "application/x-font-ttf";
				break;
			case "oet":
				mtype = "application/vnd.ms-fontobject";
				break;
			case "svg":
				mtype = "image/svg+xml";
				break;
			case "js":
				mtype = "application/x-javascript";
				break;
			case "css":
				mtype =  "text/css";
				break;
			default:
				break;
		}

		if (mtype !== undefined) {
			resp.writeHead(200, {"Content-Type": mtype});
		}
		content = fs.readFileSync(path);
	}
	else {
		// 404
		content = `Path '${path}' is not found!`;
		resp.writeHead(404);
	}

	if (type !== null) {
		resp.end(content, type);
	}
	resp.end(content);
};

const server = http.createServer(worker);
const port = process.env.PORT || 80;

server.listen(port, () => {
	console.log('Сервер запущен!');
});
