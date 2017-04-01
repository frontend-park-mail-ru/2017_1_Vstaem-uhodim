"use strict";

import "./window_menu.css";
import Menu from "../menu/menu.js";

export default class WindowMenu {
	constructor(options) {
		this.el = document.createElement("div");
	}

	render() {
		this.title = document.createElement("div");
		this.title.classList.add("windowMenu__title");
		this.title.innerHTML = this.title;
		this.el.appendChild(this.title);


		this.menu = new Menu({
			controls: [
				{
					text: "Новая игра!",
					action: true,
					id: "js-index-game",
					href: "/game"
				},
				{
					text: "На главную",
					action: false,
					href: "/"
				}
			]
		});

		this.menu.render();

		this.el.appendChild(this.menu.el);

		this.el.classList.add("windowMenu");
		return this;
	}

	setTitle(title) {
		this.title.innerHTML = title;
	}

}
