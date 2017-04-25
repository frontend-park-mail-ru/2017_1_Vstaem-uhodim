"use strict";

import "./canvas.css";
import Transport from "../../modules/transport.js";

const [getComputedStyle] = [window.getComputedStyle];

export default class Canvas {
	constructor() {
		this.el = document.createElement("canvas");
		this.transport = new Transport();
		[this.page] = [document.getElementsByClassName("page_type_game")[0]];
		this.lastPoint = null;
	}

	render() {
		return this;
	}

	showMPResult(content) {
		if (this.resultTable === undefined) {
			this.resultTable = document.createElement("div");
			this.resultTable.classList.add("canvas__result");
			this.el.parentNode.appendChild(this.resultTable);
		}

		this.resultTable.innerHTML = `Угадал: ${content.winner}<br>Слово: ${content.word}`;
		this.resultTable.hidden = false;
	}

	hideResult() {
		if (this.resultTable !== undefined) {
			this.resultTable.hidden = true;
		}
	}

	paint(word) {
		this.picture = {word: "", points: []};
		this.time = new Date();
		this.count = 0;

		this.el.width = this.el.offsetWidth;
		this.el.height = this.el.offsetHeight;

		//[this.page] = [document.getElementsByClassName("page_type_game")[0]];
		this.context = this.el.getContext("2d");

		this.context.font = "27px Pangolin";
		this.context.fillText(`Изобразите: ${word}`, this.el.offsetWidth/2 - 150, 30);

		this.isPainting = false;

		this.context.strokeStyle = "black";
		this.context.lineJoin = "round";
		this.context.lineWidth = 5;

		this.el.onmousedown = startPainting.bind(this);
		this.el.onmouseup = stopPainting.bind(this);
		this.el.onmouseout = stopPainting.bind(this);
		this.el.onmousemove = painting.bind(this);

		function startPainting(event) {
			this.isPainting = true;
			const x = event.pageX - this.el.offsetLeft - parseInt(getComputedStyle(this.page).marginLeft);
			const y = event.pageY - this.el.offsetTop - parseInt(getComputedStyle(this.page).marginTop);
			this.context.beginPath();
			this.context.moveTo(x, y);
			this.picture.points.push({time: new Date() - this.time, x: (x/this.el.width).toFixed(3), y: (y/this.el.height).toFixed(3), down:true, color:this.context.strokeStyle});
			this.transport.send("NEW_POINT", {x:(x/this.el.width).toFixed(3), y: (y/this.el.height).toFixed(3), down:true, color:this.context.strokeStyle});
			this.count++;
		}

		function painting(event) {
			if (this.isPainting) {
				const x = event.pageX - this.el.offsetLeft - parseInt(getComputedStyle(this.page).marginLeft);
				const y = event.pageY - this.el.offsetTop - parseInt(getComputedStyle(this.page).marginTop);


				this.context.lineTo(x, y);
				this.context.stroke();
				this.count++;
				if (this.count % 3 === 0) {
					this.picture.points.push({
						time: new Date() - this.time,
						x: (x / this.el.width).toFixed(3),
						y: (y / this.el.height).toFixed(3)
					});
					this.transport.send("NEW_POINT", {x:(x/this.el.width).toFixed(3), y: (y/this.el.height).toFixed(3)});
				}
			}
		}

		function stopPainting() {
			this.isPainting = false;
		}

	}

	disablePaint() {
		this.el.onmousedown = null;
		this.el.onmouseup = null;
		this.el.onmouseout = null;
		this.el.onmousemove = null;
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
				this.context.moveTo(points[number].x * this.el.width, points[number].y * this.el.height);
			}
			if (!points[number + 1].down) {
				this.context.lineTo(points[number + 1].x * this.el.width, points[number + 1].y * this.el.height);
			}
			this.context.stroke();
			if (number + 3 > points.length) {
				return;
			}
			number++;

			setTimeout(draw.bind(this), points[number+1].time - points[number].time);
		}

		draw.call(this);

	}

	savePicture() {
		return JSON.stringify(this.picture);
	}

	reset() {
		this.el.getContext("2d").clearRect(0, 0, this.el.width, this.el.height);
		this.stopSinglePainting = true;
		this.lastPoint = null;
	}

	addPoint(point) {
		this.context = this.el.getContext("2d");

		if (this.lastPoint === null) {
			this.lastPoint = point;
			return;
		}

		if (this.lastPoint.color !== undefined) {
			this.context.strokeStyle = this.lastPoint.color;
		}
		if (this.lastPoint.down) {
			this.context.beginPath();
			this.context.moveTo(this.lastPoint.x * this.el.width, this.lastPoint.y * this.el.height);
		}
		if (!point.down) {
			this.context.lineTo(point.x * this.el.width, point.y * this.el.height);
		}
		this.context.stroke();

		this.lastPoint = point;
	}
}
