"use strict";

const [Headers, fetch] = [window.Headers, window.fetch];

export default class HTTP {
	constructor() {
		if (HTTP.__instance) {
			return HTTP.__instance;
		}

		this.baseUrl = "https://croco2017.herokuapp.com/";
		//this.baseUrl = "http://localhost:8082/";

		HTTP.__instance = this;
	}

	makeRequest(reqMethod, url, headers = null, body = null, query = null) {
		if (query) {
			url += "?";
			url += Object.keys(query).map(name => `${name}=${encodeURIComponent(query[name])}`).join("&");
		}
		const headersObj = new Headers();
		if (headers) {
			Object.keys(headers).forEach(name => headersObj.append(name, headers[name]));
		}
		return fetch(`${this.baseUrl}${url}`, {method: reqMethod, credentials: "include", headers: headersObj, body: body});
	}

	get(url, query = null) {
		return this.makeRequest("GET", url, null, null, query);
	}

	post(url, body = null, query = null) {
		if (body) {
			body = JSON.stringify(body);
		}
		return this.makeRequest("POST", url, {"Content-type": "application/json; charset=utf-8"}, body, query);
	}
}
