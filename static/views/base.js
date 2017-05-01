import HTTP from "../modules/http.js";
import Mediator from "../modules/mediator.js";
import Preloader from "../blocks/preloader/preloader.js";

export default class BaseView {
	constructor(node) {
		this.el = node;
		this.rendered = false;
		this.mediator = new Mediator();

		this.preloader = new Preloader();

		this.mediator.subscribe("VIEW_LOADED", this.hidePreloader.bind(this));
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

	showPreloader() {
		this.preloader.el.hidden = false;
	}

	hidePreloader() {
		this.preloader.stopAnimation();
		this.preloader.el.hidden = true;
	}

	show() {
		this.showPreloader();
		if (!this.rendered) {
			this.render();
			this.rendered = true;
		}
		else {
			this.update();
			this.el.hidden = false;
		}
	}

	hide() {
		this.el.hidden = true;
	}

	update() {
		this.mediator.publish("VIEW_LOADED");
	}
}
