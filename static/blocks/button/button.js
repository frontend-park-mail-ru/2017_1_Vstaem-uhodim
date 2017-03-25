"use strict";

import "./button.css";

export default class Button {
	constructor(options) {
		this.text = options.text;
		this.attrs = options.attrs || {};

		this.el = document.createElement(options.tagname || "a");
		//debugger;
		if (options.tagname == "input") {
			this.attrs["value"] = this.text;
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
