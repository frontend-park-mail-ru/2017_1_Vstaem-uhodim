"use strict";
import "./timer.css";
const [CustomEvent] = [window.CustomEvent];

export default class Timer {
	constructor() {
		this.el = document.createElement("div");
	}

	render() {
		this.el.classList.add("timer");
		return this;
	}

	setStartValue(startValue) {
		this.startValue = startValue;
	}

	setMessage(message) {
		this.el.innerHTML = "Игра скоро начнется...";
	}

	updateTime() {
		if (this.value === 0 ) {
			this.el.dispatchEvent(new CustomEvent("stop"));
		}
		if (Number.isInteger(this.value) && this.value > 0) {
			const sec = `0${this.value % 60}`.slice(-2);
			this.el.innerHTML = `${this.value / 60 | 0}:${sec}`;
		}
		else {
			this.el.innerHTML = "00:00";
		}
	}

	start() {
		this.value = this.startValue;
		this.stopped = false;

		function dec() {
			if (this.stopped) {
				this.stopped = false;
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
		this.setMessage("Игра скоро начнется...")
	}
}
