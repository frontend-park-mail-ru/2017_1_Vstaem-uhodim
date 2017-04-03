"use strict";

import "./menu.css";
import Button from "../button/button.js";

export default class Menu {
	constructor(options) {
		this.controls = options.controls;
		this.el = document.createElement("div");
	}

	setControls() {
		this.controls.forEach(control => {
			let htmlClass = null;
			if (control.action) {
				htmlClass = "menu__button_action";
			}

			let controlEl = new Button({
				text: control.text,
				attrs: {
					class: htmlClass,
					id: control.id,
					href: control.href
				}
			});
			controlEl.render();

			controlEl.el.classList.add("button_size_big");
			controlEl.el.classList.add("menu__button");

			controlEl.el.addEventListener("click", control.click);

			this.el.appendChild(controlEl.el);
		});
	}

	render() {
		this.setControls();
		this.el.classList.add("menu");
		return this;
	}
}
