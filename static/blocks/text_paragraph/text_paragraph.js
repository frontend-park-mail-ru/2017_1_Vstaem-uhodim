"use strict";
import "./text_paragraph.css";

export default class TextParagraph {
	constructor(options) {
		this.text = options.text;
		this.title = options.title || "";

		this.el = document.createElement("div");
	}

	setTitle() {
		if (this.title !== "") {
			let titleEl = document.createElement("div");
			titleEl.classList.add("paragraph__title");
			titleEl.innerHTML = this.title;

			this.el.appendChild(titleEl);
		}
	}

	setText() {
		this.el.innerHTML += this.text;
	}

	render() {
		this.setTitle();
		this.setText();
		this.el.classList.add("paragraph");
		return this;
	}
}
