"use strict";

import HTTP from "../modules/http.js";
const CustomEvent = window.CustomEvent;

export default class LogoutView {
	async show() {
		let http = new HTTP();
		const resp = await http.post("logout/");

		document.dispatchEvent(new CustomEvent("redirect", {detail: "/"}));
	}

	hide() {

	}
}
