"use strict";

import HTTP from "../modules/http.js";
const CustomEvent = window.CustomEvent;

export default class LogoutView {
	show() {
		console.log("logout");
		let http = new HTTP();
		http.post("logout/")
			.then(() => {
				document.dispatchEvent(new CustomEvent("redirect", {detail: "/"}));
		});
	}

	hide() {

	}
}
