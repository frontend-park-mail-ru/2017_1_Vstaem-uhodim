import HTTP from "../modules/http.js";
import Mediator from "../modules/mediator.js";

export default class BaseView {
	constructor(node) {
		this.el = node;
		this.rendered = false;
		this.mediator = new Mediator();
	}

	async currentUser() {
		const http = new HTTP();
		const resp = await http.get("who-am-i/");
		if (resp.status === 200) {
			const user = await resp.json();

			return {
				type: "authorized",
				nickname: user.login,
				score: user.rating
			};
		}
		else {
			return {
				type: "notAuthorized",
				nickname: "",
				score: ""
			};
		}
	}

	show() {
		if (!this.rendered) {
			this.render();
			this.rendered = true;
		}
		else {
			this.update();
		}
		this.el.hidden = false;
	}

	hide() {
		this.el.hidden = true;
	}

	update() {

	}
}
