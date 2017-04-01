"use strict";

import HTTP from "../modules/http.js";
const CustomEvent = window.CustomEvent;
const location = window.location;

export default class LogoutView {
	render() {
		let http = new HTTP();
		http.post("logout/")
			.then(() => {
				document.dispatchEvent(new CustomEvent("redirect", {detail: location.pathname}));
			});
	}
}
