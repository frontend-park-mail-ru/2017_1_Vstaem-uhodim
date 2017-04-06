"use strict";

import "./button.css";

export default class Button {
	constructor({text, attrs = {}, tagname = "a"}) {
		this.text = text;
		this.attrs = attrs;

		this.el = document.createElement(tagname);
		if (tagname === "input") {
			this.attrs.value = this.text;
		}
	}

	setAttrs(attrs) {
		Object.keys(attrs).forEach(name => {
			this.el.setAttribute(name, this.attrs[name]);
		});
	}

	render() {
		this.el.innerHTML = this.text;
		this.setAttrs(this.attrs);
		this.el.classList.add("button");
		return this;
	}

	toString() {
		return this.el.outerHTML;
	}
}
