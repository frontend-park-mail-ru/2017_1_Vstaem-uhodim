"use strict";
import "./user_area.scss";
import template from "./user_area.pug";

const [Event] = [window.Event];

export default class UserArea {
	constructor({type, nickname, score}) {
		this.type = type;
		this.nickname = nickname;
		this.score = score;
		this.el = document.createElement("div");
	}

	setContent() {
		if (this.type === "authorized") {
			this.el.innerHTML = template({offline: false, authorized: true, nickname: this.nickname, score: this.score});
			this.el.id = "js-index-userareaLogin";
		}
		if (this.type === "notAuthorized") {
			this.el.innerHTML = template({offline: false, authorized: false});
			this.el.id = "js-index-userareaLogout";
		}
		if (this.type === "offline") {
			this.el.innerHTML = template({offline: true});
		}
	}

	update(options) {
		this.type = options.type;
		this.nickname = options.nickname;
		this.score = options.score;
		this.render();
	}

	render() {
		this.setContent();

		this.el.classList.add("user-area");
	}
}
