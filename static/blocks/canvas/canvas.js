"use strict";

import "./canvas.css";

export default class Canvas {
	constructor() {
		this.el = document.createElement("canvas");
	}

	render() {
		return this;
	}

	paint() {
		let canvas = this.el;
		let page;
		let context;
		let isPainting;

		const getComputedStyle = window.getComputedStyle;
		canvas.width = this.el.offsetWidth;
		canvas.height = this.el.offsetHeight;

		page = document.getElementsByClassName("page_type_game")[0];
		context = canvas.getContext("2d");
		isPainting = false;

		context.strokeStyle = "black";
		context.lineWidth = 5;

		canvas.onmousedown = startPainting;
		canvas.onmouseup = stopPainting;
		canvas.onmouseout = stopPainting;
		canvas.onmousemove = painting;

		function startPainting(event) {
			isPainting = true;
			context.beginPath();
			context.moveTo(event.pageX - canvas.offsetLeft - parseInt(getComputedStyle(page).marginLeft), event.pageY - canvas.offsetTop - parseInt(getComputedStyle(page).marginTop));
		}

		function painting(event) {
			if (isPainting) {
				let x = event.pageX - canvas.offsetLeft - parseInt(getComputedStyle(page).marginLeft);
				let y = event.pageY - canvas.offsetTop - parseInt(getComputedStyle(page).marginTop);

				context.lineTo(x, y);
				context.stroke();
			}
		}

		function stopPainting() {
			isPainting = false;
		}
	}
}
