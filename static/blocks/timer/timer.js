"use strict";
import "./timer.css";

export default class Timer {
	constructor(startValue) {
		this.value = startValue;
		this.el = document.createElement("div");
	}

	render() {
		this.el.classList.add("timer");
		this.updateTime();
		return this;
	}

	updateTime() {
		this.el.innerHTML = `${this.value / 60 | 0}:${this.value % 60}`;
	}

	start() {
		this.stopped = false;

		function dec() {
			if (this.stopped) {
				this.stopped = false;
				console.log("stop");
				return;
			}
			this.value -= 1;
			this.updateTime();

			setTimeout(dec.bind(this), 1000);
		}

		dec.bind(this)();
	}

	stop() {
		this.stopped = true;
	}
}
