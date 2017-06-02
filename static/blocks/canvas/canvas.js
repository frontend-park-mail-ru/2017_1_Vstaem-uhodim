"use strict";

import "./canvas.scss";
import Transport from "../../modules/transport.js";

const [getComputedStyle] = [window.getComputedStyle];

export default class Canvas {
	constructor({wide = false}) {
		this.wide = wide;
		this.el = document.createElement("canvas");
		this.transport = new Transport();

		[this.page, this.clear] = [document.getElementsByClassName("page_type_game")[0], document.getElementsByClassName("button_type_clear")[0]];
		this.x1 = null;
		this.x2 = null;
		this.points = [];

		window.addEventListener("resize", () => {
			this.fixRatio();
		});
	}

	render() {
		if (this.wide) {
			this.el.style.width = "96%";
			this.el.style.marginLeft = "2%";
			this.el.style.marginRight = "2%";
		}
		return this;
	}

	showMPResult(content) {
		if (this.resultTable === undefined) {
			this.resultTable = document.createElement("div");
			this.resultTable.classList.add("canvas__result");
			this.el.parentNode.appendChild(this.resultTable);
		}

		if (content.result === 0 && content.winner === undefined) {
			this.resultTable.innerHTML = `Время вышло!<br>Слово: ${content.word}`;
		}
		if (content.result === 0 && content.winner !== undefined) {
			this.resultTable.innerHTML = `Угадал: ${content.winner}<br>Слово: ${content.word}`;
		}
		if (content.result === 1) {
			this.resultTable.innerHTML = `Вы угадали!<br>Слово: ${content.word}`;
		}
		if (content.result === 2) {
			this.resultTable.innerHTML = `Ведущий вышел...<br>Слово: ${content.word}`;
		}

		this.resultTable.hidden = false;
	}

	hideResult() {
		if (this.resultTable !== undefined) {
			this.resultTable.hidden = true;
		}
	}

	paint(word = null) {
		this.picture = {word: "", points: []};
		this.time = new Date();
		this.count = 0;

		this.el.width = this.el.offsetWidth;
		this.el.height = this.el.offsetHeight;

		//[this.page] = [document.getElementsByClassName("page_type_game")[0]];
		[this.background] = [document.getElementsByClassName("background")[0]];
		this.context = this.el.getContext("2d");


		this.writeWord(word);
		this.isPainting = false;

		this.context.strokeStyle = "black";
		this.context.lineJoin = "round";
		this.context.lineWidth = 6;


		this.el.addEventListener("touchstart", ((e) => {
			const mouseEvent = new MouseEvent("mousedown", {
				clientX: e.touches[0].clientX,
				clientY: e.touches[0].clientY
			});
			this.el.dispatchEvent(mouseEvent);
		}).bind(this), false);

		this.el.addEventListener("touchmove", ((e) => {
			e.preventDefault();
			const mouseEvent = new MouseEvent("mousemove", {
				clientX: e.touches[0].clientX,
				clientY: e.touches[0].clientY
			});
			this.el.dispatchEvent(mouseEvent);
		}).bind(this), false);
		this.el.addEventListener("touchend", ((e) => {
			const mouseEvent = new MouseEvent("mouseup", {});
			this.el.dispatchEvent(mouseEvent);
		}).bind(this), false);

		this.el.onmousedown = startPainting.bind(this);
		this.el.onmouseup = stopPainting.bind(this);
		this.el.onmouseout = stopPainting.bind(this);
		this.el.onmousemove = painting.bind(this);

		function startPainting(event) {
			this.isPainting = true;
			const x = event.pageX - this.el.offsetLeft - parseInt(getComputedStyle(this.page).marginLeft);
			const y = event.pageY - this.el.offsetTop - parseInt(getComputedStyle(this.page).marginTop) + this.background.scrollTop;
			this.context.beginPath();
			this.context.moveTo(x, y);
			this.picture.points.push({time: new Date() - this.time, x: (x/this.el.width).toFixed(3), y: (y/this.el.height).toFixed(3), down:true, color:this.context.strokeStyle});
			this.transport.send("NEW_POINT", {x:(x/this.el.width).toFixed(3), y: (y/this.el.height).toFixed(3), down:true, color:this.context.strokeStyle});
			this.count++;
		}

		function painting(event) {
			if (this.isPainting) {
				const x = (event.pageX - this.el.offsetLeft - parseInt(getComputedStyle(this.page).marginLeft))*(this.el.width/this.el.offsetWidth);
				const y = (event.pageY - this.el.offsetTop - parseInt(getComputedStyle(this.page).marginTop))*(this.el.height/this.el.offsetHeight) + this.background.scrollTop;

				this.context.lineTo(x, y);
				//this.context.quadraticCurveTo(0, 0, x, y);
				this.context.stroke();
				this.count++;
				if (this.count % 3 === 0) {
					this.picture.points.push({
						time: new Date() - this.time,
						x: (x / this.el.width).toFixed(3),
						y: (y / this.el.height).toFixed(3)
					});
					// remove color
					this.transport.send("NEW_POINT", {x:(x/this.el.width).toFixed(3), y: (y/this.el.height).toFixed(3), color: "black"});
				}
				//this.transport.send("NEW_POINT", {x:(x/this.el.width).toFixed(3), y: (y/this.el.height).toFixed(3), color: "black"});
			}
		}

		function stopPainting() {
			this.isPainting = false;
		}

	}

	writeWord(word) {
		if (word !== null) {
			this.context.font = "27px Pangolin";
			if (this.page.offsetWidth < 500) {
				const offset = word.length > 10 ? 30 : 60;
				this.context.fillText(`Изобразите:`, 60, 30);
				this.context.fillText(word, offset, 70);
			}
			else {
				const offset = word.length > 10 ? 20 : this.el.width / 2 - 150;
				this.context.fillText(`Изобразите: ${word}`, offset, 30);
			}
		}
	}

	disablePaint() {
		this.el.onmousedown = null;
		this.el.onmouseup = null;
		this.el.onmouseout = null;
		this.el.onmousemove = null;
	}

	drawPictureByPoints(points, quick = false) {
		this.fixSize();
		this.context = this.el.getContext("2d");

		this.context.lineJoin = "round";
		this.context.lineCap = "round";
		this.context.lineWidth = 6;


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
				//this.context.quadraticCurveTo(0, 0, points[number + 1].x * this.el.width, points[number + 1].y * this.el.height);
			}
			this.context.stroke();
			if (number + 3 > points.length) {
				return;
			}
			number++;

			//const timeout = quick ? 0 : points[number+1].time - points[number].time;
			if (quick) {
				draw.call(this);
			}
			else {
				setTimeout(draw.bind(this), points[number+1].time - points[number].time);
			}
		}

		draw.call(this);

		this.context.closePath();

	}

	savePicture() {
		return JSON.stringify(this.picture);
	}

	reset(word = null) {
		this.el.getContext("2d").clearRect(0, 0, this.el.width, this.el.height);
		this.stopSinglePainting = true;
		this.x1 = null;
		this.x2 = null;
		this.writeWord(word);
	}

	fixRatio() {
		if (this.el.offsetHeight < 0.9 * this.el.offsetWidth) {
			this.el.style.height = `${this.el.offsetWidth}px`;
		}

		if (this.el.offsetHeight > this.page.offsetHeight - 150) {
			this.el.style.height = `${this.page.offsetHeight - 150}px`;
		}
		this.clear.style.top = `${this.el.clientHeight + 100}px`;
		this.clear.style.left = `${this.el.clientWidth/2 - 30}px`;
	}

	fixSize() {
		this.fixRatio();
		this.el.width = 1.5 * this.el.offsetWidth;
		this.el.height = 1.5 * this.el.offsetHeight;
	}

	addPoint(point) {
		this.context = this.el.getContext("2d");
		this.context.lineCap = "round";
		this.context.lineJoin = "round";
		this.context.lineWidth = 6;

		if (this.x1 === null) {
			this.x1 = point;
			return;
		}

		if(this.x2 === null) {
			this.x2 = point;
			return;
		}

		const controlPointX = 1/2 * (this.x1.x + this.x2.x) - 1/5 * (point.x - this.x2.x);
		const controlPointY = 1/2 * (this.x1.y + this.x2.y) - 1/5 * (point.y - this.x2.y);

		if (this.x1.color !== undefined) {
			this.context.strokeStyle = this.x1.color;
		}
		if (this.x1.down) {
			this.context.beginPath();
			this.context.moveTo(this.x1.x * this.el.width, this.x1.y * this.el.height);
		}
		if (!this.x2.down) {
			//this.context.lineTo(this.x2.x * this.el.width, this.x2.y * this.el.height);
			this.context.quadraticCurveTo(controlPointX * this.el.width, controlPointY * this.el.height, this.x2.x * this.el.width + 0.5, this.x2.y * this.el.height + 0.5);
		}
		this.context.stroke();

		this.x1 = this.x2;
		this.x2 = point;
	}
}
