"use strict";
import "./text_paragraph.scss";

export default class TextParagraph {
	constructor({text, title = ""}) {
		this.text = text;
		this.title = title;

		this.el = document.createElement("div");
	}

	setTitle() {
		if (this.title !== "") {
			this.titleEl = document.createElement("div");
			this.titleEl.classList.add("paragraph__title");
			this.titleEl.innerHTML = this.title;

			this.el.appendChild(this.titleEl);
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
