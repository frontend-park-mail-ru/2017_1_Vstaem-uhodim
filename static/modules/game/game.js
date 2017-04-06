"use strict";

import Mediator from "../mediator.js";
import HTTP from "../http.js";

export default class Game {
	constructor(Strategy, username, canvas, chat, timer, shadow, windowMenu) {

		this.username = username;
		this.canvas = canvas;
		this.chat = chat;
		this.timer = timer;
		this.timer.setStartValue(30);
		this.shadow = shadow;
		this.windowMenu = windowMenu;
		this.strategy = new Strategy();
		this.mediator = new Mediator();


		this.mediator.subscribe("START_TIMER", this.startTimer.bind(this));
		this.mediator.subscribe("START_SINGLE_PAINTING", this.startSinglePainting.bind(this));
		this.mediator.subscribe("STOP_TIMER", this.stopTimer.bind(this));
		this.mediator.subscribe("STOP_SINGLE_PAINTING", this.stopSinglePainting.bind(this));
		this.mediator.subscribe("SHOW_SINGLE_RESULT", this.showSingleResult.bind(this));
		this.mediator.subscribe("SHOW_RULES", this.showRules.bind(this));


		this.chat.el.addEventListener("submit", async (event) => {
			const http = new HTTP();

			const resp = await http.post("check-answer/", null, {word: event.detail});
			if (resp.status === 200) {
				this.mediator.publish("RIGHT_ANSWER");
			}
		});

		this.timer.el.addEventListener("stop", () => {
			this.mediator.publish("FAILURE");
		});

	}

	start() {
		this.shadow.el.hidden = true;
		this.windowMenu.setTitle("");
		this.windowMenu.el.hidden = true;
		this.chat.reset();
		this.canvas.reset();
		this.timer.stop();
		this.mediator.publish("START_GAME");
	}

	startTimer() {
		this.timer.start();
	}

	stopTimer() {
		this.timer.stop();
	}

	async startSinglePainting() {
		const http = new HTTP();

		const resp = await http.post("start-game/");
		if (resp.status === 200) {
			const picture = await resp.json();
			this.mediator.publish("RECEIVE_PICTURE");
			this.canvas.drawPictureByPoints(picture.points);
		}
		else {

		}
	}

	stopSinglePainting() {
		this.canvas.stopSinglePainting = true;
	}

	showSingleResult(result) {
		this.shadow.el.hidden = false;
		let title;
		if (result === 0) {
			title = "Неудача...";
		}
		else {
			title = "Вы угадали!";
		}

		this.windowMenu.setTitle(title);
		this.windowMenu.el.hidden = false;
	}

	showRules() {
		this.chat.addMessage("Задача", "угадать, что будет нарисовано на картинке и написать ответ в чат");
	}

}
