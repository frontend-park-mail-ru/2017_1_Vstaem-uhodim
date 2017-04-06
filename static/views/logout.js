"use strict";

import HTTP from "../modules/http.js";
const [CustomEvent] = [window.CustomEvent];

export default class LogoutView {
	async show() {
		const http = new HTTP();
		const resp = await http.post("logout/");

		document.dispatchEvent(new CustomEvent("redirect", {detail: "/"}));
	}

	hide() {

	}
}
