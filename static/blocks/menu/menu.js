"use strict";

import "./menu.scss";
import Button from "../button/button.js";

export default class Menu {
	constructor({controls}) {
		this.controls = controls;
		this.el = document.createElement("div");
	}

	setControls() {
		this.controls.forEach(control => {

			const controlEl = new Button({
				text: control.text,
				attrs: {
					id: control.id,
					href: control.href
				}
			});
			controlEl.render();

			if (control.action) {
				controlEl.el.classList.add("menu__button_action");
			}

			if (control.main) {
				controlEl.el.classList.add("menu__button_main");
			}

			if (control.wide) {
				controlEl.el.classList.add("menu__button_wide");
			}

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

	deleteButton() {
		let deleted = document.getElementById("new_game");
		if (deleted !== null) {
			this.el.removeChild(document.getElementById("new_game"));
		}
	}
}
