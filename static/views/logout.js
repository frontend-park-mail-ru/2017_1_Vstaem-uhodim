"use strict";

import HTTP from "../modules/http.js";

export default class LogoutView {
	render() {
		let http = new HTTP();
		http.post("logout/")
			.then(() => {
				document.dispatchEvent(new CustomEvent("redirect", {detail: location.pathname}));
			});
		}
}
