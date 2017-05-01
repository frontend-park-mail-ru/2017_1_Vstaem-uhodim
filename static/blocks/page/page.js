"use strict";

import "./page.scss";
import Button from "../button/button.js";
const [Event] = [window.Event];
export default class Page {
	constructor({type, title = "", notification = "", controls = []}) {
		this.type = type;
		this.title = title;
		this.notification = notification;
		this.controls = controls;
		this.el = document.createElement("div");
	}

	setTitle() {
		if (this.title !== "") {
			const titleEl = document.createElement("div");
			titleEl.innerText = this.title;
			titleEl.classList.add("page__title");
			this.el.appendChild(titleEl);
		}
	}

	setNotification() {
		if (this.notification !== "") {
			const notEl = document.createElement("div");
			notEl.innerText = this.notification;
			notEl.classList.add("page__notification");
			this.el.appendChild(notEl);
		}
	}

	setType() {
		switch (this.type) {
			case "single":
			case "left":
			case "right":
			case "game":
				break;
			default:
				this.type = "single";
				break;
		}
		this.el.classList.add(`page_type_${this.type}`);
	}

	setControls(controls) {
		controls.forEach(control => {
			const controlButton = new Button({
				text: control.text,
				attrs: {
					class: "button_size_mini button_type_back",
					href: control.href
				}
			});
			this.el.appendChild(controlButton.render().el);

			const page = this.el;
			controlButton.el.addEventListener("click", (event) => {
				event.preventDefault();
				page.dispatchEvent(new Event(control.event));
			});
			controlButton.el.addEventListener("click", control.click);
		});
	}

	render() {
		this.setControls(this.controls);
		this.setNotification();
		this.setTitle();
		this.setType();
		this.el.classList.add("page");
		return this;
	}
}
