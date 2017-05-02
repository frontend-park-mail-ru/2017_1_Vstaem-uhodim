"use strict";

import "./image_croc.scss";
import template from "./image_croc.pug";

export default class ImageCroc {
	constructor() {
		this.el = document.createElement("div");
		this.el.id = "main";
	}

	fixTail() {
		const tail = this.el.querySelector("#tail");
		const main = this.el;

		//let height = main.offsetWidth;
		const height = 300;

		main.style.height = `${height}px`;
		tail.style.borderWidth = `${(height * 110 / 360)}px`;
		tail.style.borderBottomWidth = `${(height * 60 / 360)}px`;
		tail.style.borderRightWidth = `${(height * 60 / 360)}px`;
	}

	render() {
		this.el.innerHTML = template();
		this.el.classList.add("croco-image");
		return this;
	}
}
