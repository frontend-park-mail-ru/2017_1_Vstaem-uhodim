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
		context.lineJoin = "round";
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

	drawPictureByPoints(points, color) {
		let canvas = this.el;

		canvas.width = this.el.offsetWidth;
		canvas.height = this.el.offsetHeight;
		let context = canvas.getContext("2d");

		context.lineJoin = "round";
		context.lineCap = "round";
		context.strokeStyle = color;
		context.lineWidth = 5;


		let number = 0;
		canvas.stopSinglePainting = false;

		function draw() {
			if (canvas.stopSinglePainting) {
				canvas.stopSinglePainting = false;
				return;
			}
			if (number > 0) {
				if (number === 1) {
					context.moveTo(points[number - 1].x, points[number - 1].y);
				}
				context.lineTo(points[number].x, points[number].y);
				context.stroke();
			}
			if (number + 1 > points.length) {
				return;
			}
			number++;

			setTimeout(draw, (points[number+1].time - points[number].time)*1000);
		}

		draw();

	}

	reset() {
		this.el.getContext("2d").clearRect(0, 0, this.el.width, this.el.height);
		this.el.stopSinglePainting = true;
	}
}
