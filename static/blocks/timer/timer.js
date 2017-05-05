"use strict";
import "./timer.scss";
const [CustomEvent] = [window.CustomEvent];

export default class Timer {
	constructor() {
		this.el = document.createElement("div");
	}

	render() {
		this.el.classList.add("timer");
		return this;
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

	start(time) {
		this.value = time;

		this.interval = setInterval(() => {
			this.value -= 1;
			this.updateTime();
		}, 1000);
	}

	stop() {
		clearInterval(this.interval);
		this.setMessage("Игра скоро начнется...")
	}
}
