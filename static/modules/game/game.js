"use strict";

import Mediator from "../mediator.js";

export default class Game {
	constructor(Strategy, username, canvas, chat, timer, shadow, windowMenu) {

		this.username = username;
		this.canvas = canvas;
		this.chat = chat;
		this.timer = timer;
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

	}

	start() {
		this.shadow.el.hidden = true;
		this.windowMenu.setTitle("");
		this.windowMenu.el.hidden = true;
		this.chat.reset();
		this.canvas.reset();
		this.mediator.publish("START_GAME");
	}

	startTimer() {
		this.timer.start();
	}

	stopTimer() {
		this.timer.stop();
	}

	startSinglePainting() {
		function getPicture() {
			let picture1 = {
				color: "brown",
				word: "дом",
				points: [
					{
						time: 0,
						x: 330,
						y: 10
					},
					{
						time: 3,
						x: 100,
						y: 140
					},
					{
						time: 5,
						x: 150,
						y: 140
					},
					{
						time: 6,
						x: 150,
						y: 350
					},
					{
						time: 7,
						x: 500,
						y: 350
					},
					{
						time: 8,
						x: 500,
						y: 140
					},
					{
						time: 10,
						x: 550,
						y: 140
					},
					{
						time: 11,
						x: 330,
						y: 10
					},
					{
						time: 12,
						x: 0,
						y: 0
					}
				]

			};

			let picture2 = {
				color: "#C3DBCF",
				word: "звезда",
				points: [
					{
						time: 0,
						x: 330,
						y: 10
					},
					{
						time: 1,
						x: 200,
						y: 400
					},
					{
						time: 2,
						x: 540,
						y: 150
					},
					{
						time: 3,
						x: 120,
						y: 150
					},
					{
						time: 4,
						x: 460,
						y: 400
					},
					{
						time: 5,
						x: 330,
						y: 10
					},
					{
						time: 6,
						x: 330,
						y: 10
					}

				]
			};


			let picture3 = {
				color: "red",
				word: "сердце",
				points: [
					{
						time: 0,
						x: 330,
						y: 150
					},
					{
						time: 1,
						x: 250,
						y: 80
					},
					{
						time: 2,
						x: 120,
						y: 200
					},
					{
						time: 3,
						x: 330,
						y: 400
					},
					{
						time: 4,
						x: 540,
						y: 200
					},
					{
						time: 5,
						x: 410,
						y: 80
					},
					{
						time: 6,
						x: 330,
						y: 150
					},
					{
						time: 7,
						x: 330,
						y: 10
					}

				]
			};


			return JSON.stringify(picture2);
		}
		// request /getPicture/

		let picture = JSON.parse(getPicture());
		let answer = picture.word;
		this.canvas.drawPictureByPoints(picture.points, picture.color);

		this.chat.el.addEventListener("submit", event => {
			if (event.detail == answer) {
				this.mediator.publish("RIGHT_ANSWER");
			}
		});
	}

	stopSinglePainting() {
		this.canvas.stopSinglePainting = true;
	}

	showSingleResult() {
		this.shadow.el.hidden = false;
		this.windowMenu.setTitle("Вы угадали!");
		this.windowMenu.el.hidden = false;
	}

	showRules() {
		this.chat.addMessage("Задача", "угадать, что будет нарисовано на картинке и написать ответ в чат")
	}

}
