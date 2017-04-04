"use strict";

import "./canvas.css";
const getComputedStyle = window.getComputedStyle;

export default class Canvas {
	constructor() {
		this.el = document.createElement("canvas");
	}

	render() {
		return this;
	}

	paint() {
		this.el.width = this.el.offsetWidth;
		this.el.height = this.el.offsetHeight;

		this.page = document.getElementsByClassName("page_type_game")[0];
		this.context = this.el.getContext("2d");
		this.isPainting = false;

		this.context.strokeStyle = "black";
		this.context.lineJoin = "round";
		this.context.lineWidth = 5;

		this.el.onmousedown = startPainting;
		this.el.onmouseup = stopPainting;
		this.el.onmouseout = stopPainting;
		this.el.onmousemove = painting;

		function startPainting(event) {
			this.isPainting = true;
			this.context.beginPath();
			this.context.moveTo(event.pageX - this.el.offsetLeft - parseInt(getComputedStyle(this.page).marginLeft), event.pageY - this.el.offsetTop - parseInt(getComputedStyle(this.page).marginTop));
		}

		function painting(event) {
			if (this.isPainting) {
				let x = event.pageX - this.el.offsetLeft - parseInt(getComputedStyle(this.page).marginLeft);
				let y = event.pageY - this.el.offsetTop - parseInt(getComputedStyle(this.page).marginTop);

				this.context.lineTo(x, y);
				this.context.stroke();
			}
		}

		function stopPainting() {
			this.isPainting = false;
		}

	}

	drawPictureByPoints(points) {
		this.el.width = this.el.offsetWidth;
		this.el.height = this.el.offsetHeight;
		this.context = this.el.getContext("2d");

		this.context.lineJoin = "round";
		this.context.lineCap = "round";
		this.context.lineWidth = 4;


		let number = 0;
		this.stopSinglePainting = false;

		function draw() {
			if (this.stopSinglePainting) {
				this.stopSinglePainting = false;
				return;
			}
			if (points[number].color !== undefined) {
				this.context.strokeStyle = points[number].color;
			}
			if (points[number].down) {
				this.context.beginPath();
				this.context.moveTo(points[number].x, points[number].y);
			}
			if (!points[number + 1].down) {
				this.context.lineTo(points[number + 1].x, points[number + 1].y);
			}
			this.context.stroke();
			if (number + 3 > points.length) {
				return;
			}
			number++;

			setTimeout(draw.bind(this), (points[number+1].time - points[number].time)*1000);
		}

		draw.bind(this)();

	}

	reset() {
		this.el.getContext("2d").clearRect(0, 0, this.el.width, this.el.height);
		this.stopSinglePainting = true;
	}
}
