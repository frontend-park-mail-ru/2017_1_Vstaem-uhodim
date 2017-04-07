"use strict";

import "./window_menu.css";

export default class WindowMenu {
	constructor({title, menu}) {
		this.titleText = title;
		this.el = document.createElement("div");
		this.menu = menu;
	}

	render() {
		this.title = document.createElement("div");
		this.title.classList.add("windowMenu__title");
		this.title.innerHTML = this.titleText;
		this.el.appendChild(this.title);


		this.menu.render();

		this.el.appendChild(this.menu.el);

		this.el.classList.add("windowMenu");
		return this;
	}

	setTitle(title) {
		this.title.innerHTML = title;
	}

}
