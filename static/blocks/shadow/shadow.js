"use strict";

import "./shadow.css";


export default class WindowMenu {
	constructor() {
		this.el = document.createElement("div");
	}

	render() {
		this.el.classList.add("shadow");
		return this;
	}

}
