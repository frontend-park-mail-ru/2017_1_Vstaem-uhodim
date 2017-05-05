"use strict";

import "./button.scss";

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
			if (this.attrs[name] !== undefined) {
				this.el.setAttribute(name, this.attrs[name]);
			}
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
