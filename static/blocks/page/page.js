"use strict";

import "./page.css";
import Button from "../button/button.js";
const Event = window.Event;
export default class Page {
	constructor({type, title = "", controls = []}) {
		this.type = type;
		this.title = title;
		this.controls = controls;
		this.el = document.createElement("div");
	}

	setTitle(title) {
		if (this.title !== "") {
			let titleEl = document.createElement("div");
			titleEl.innerText = title;
			titleEl.classList.add("page__title");
			this.el.appendChild(titleEl);
		}
	}

	setType(type) {
		switch (type) {
			case "single":
			case "left":
			case "right":
			case "game":
				break;
			default:
				type = "single";
				break;
		}
		this.el.classList.add(`page_type_${type}`);
	}

	setControls(controls) {
		controls.forEach(control => {
			let controlButton = new Button({
				text: control.text,
				attrs: {
					class: "button_size_mini button_type_back",
					href: control.href
				}
			});
			this.el.appendChild(controlButton.render().el);

			let page = this.el;
			controlButton.el.addEventListener("click", (event) => {
				event.preventDefault();
				page.dispatchEvent(new Event(control.event));
			});
		});
	}

	render() {
		this.setControls(this.controls);
		this.setTitle(this.title);
		this.setType(this.type);
		this.el.classList.add("page");
		return this;
	}
}
