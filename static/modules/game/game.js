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

		this.chat.el.addEventListener("submit", event => {
			const http = new HTTP();

			if (event.detail === "кот") {
				this.mediator.publish("RIGHT_ANSWER");
			}

			/*
			http.post("check-answer/", null, {word: event.detail})
				.then(resp => {
					if (resp.status === 200) {
						this.mediator.publish("RIGHT_ANSWER");
					}
				})
			*/
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

	startSinglePainting() {
		const http = new HTTP();

		let picture = {"word":"кот","points":[{"time":1759,"x":"0.445","y":"0.480","down":true,"color":"#000000"},{"time":1912,"x":"0.442","y":"0.480"},{"time":1995,"x":"0.426","y":"0.498"},{"time":2074,"x":"0.398","y":"0.510"},{"time":2160,"x":"0.361","y":"0.516"},{"time":2240,"x":"0.329","y":"0.506"},{"time":2321,"x":"0.302","y":"0.494"},{"time":2402,"x":"0.289","y":"0.474"},{"time":2483,"x":"0.287","y":"0.458"},{"time":2565,"x":"0.304","y":"0.436"},{"time":2645,"x":"0.328","y":"0.428"},{"time":2724,"x":"0.352","y":"0.428"},{"time":2804,"x":"0.368","y":"0.430"},{"time":2884,"x":"0.394","y":"0.444"},{"time":2964,"x":"0.418","y":"0.462"},{"time":3043,"x":"0.438","y":"0.478"},{"time":3126,"x":"0.453","y":"0.490"},{"time":3205,"x":"0.471","y":"0.500"},{"time":3286,"x":"0.492","y":"0.510"},{"time":3368,"x":"0.510","y":"0.508"},{"time":3449,"x":"0.531","y":"0.502"},{"time":3529,"x":"0.553","y":"0.494"},{"time":3607,"x":"0.571","y":"0.480"},{"time":3688,"x":"0.585","y":"0.462"},{"time":3770,"x":"0.585","y":"0.446"},{"time":3849,"x":"0.568","y":"0.416"},{"time":3930,"x":"0.555","y":"0.406"},{"time":4013,"x":"0.534","y":"0.404"},{"time":4092,"x":"0.508","y":"0.408"},{"time":4171,"x":"0.480","y":"0.416"},{"time":4252,"x":"0.468","y":"0.426"},{"time":4331,"x":"0.456","y":"0.436"},{"time":4410,"x":"0.448","y":"0.450"},{"time":4491,"x":"0.435","y":"0.462"},{"time":4570,"x":"0.435","y":"0.462"},{"time":5749,"x":"0.341","y":"0.426","down":true,"color":"#000000"},{"time":5906,"x":"0.341","y":"0.410"},{"time":5986,"x":"0.340","y":"0.384"},{"time":6068,"x":"0.341","y":"0.349"},{"time":6148,"x":"0.356","y":"0.329"},{"time":6230,"x":"0.370","y":"0.313"},{"time":6310,"x":"0.380","y":"0.315"},{"time":6393,"x":"0.389","y":"0.339"},{"time":6472,"x":"0.389","y":"0.376"},{"time":6552,"x":"0.389","y":"0.394"},{"time":6632,"x":"0.389","y":"0.410"},{"time":7678,"x":"0.472","y":"0.422","down":true,"color":"#000000"},{"time":7780,"x":"0.472","y":"0.408"},{"time":7859,"x":"0.471","y":"0.378"},{"time":7939,"x":"0.471","y":"0.339"},{"time":8021,"x":"0.477","y":"0.321"},{"time":8101,"x":"0.495","y":"0.317"},{"time":8181,"x":"0.514","y":"0.325"},{"time":8260,"x":"0.520","y":"0.357"},{"time":8340,"x":"0.522","y":"0.376"},{"time":8421,"x":"0.522","y":"0.390"},{"time":8501,"x":"0.523","y":"0.400"},{"time":10124,"x":"0.299","y":"0.424","down":true,"color":"#000000"},{"time":10286,"x":"0.298","y":"0.396"},{"time":10365,"x":"0.299","y":"0.357"},{"time":10448,"x":"0.326","y":"0.307"},{"time":10527,"x":"0.362","y":"0.279"},{"time":10606,"x":"0.415","y":"0.257"},{"time":10687,"x":"0.462","y":"0.255"},{"time":10767,"x":"0.496","y":"0.279"},{"time":10850,"x":"0.540","y":"0.341"},{"time":10930,"x":"0.565","y":"0.378"},{"time":11015,"x":"0.570","y":"0.410"},{"time":11091,"x":"0.570","y":"0.424"},{"time":12138,"x":"0.292","y":"0.337","down":true,"color":"#000000"},{"time":12325,"x":"0.293","y":"0.365"},{"time":12408,"x":"0.293","y":"0.319"},{"time":12487,"x":"0.298","y":"0.285"},{"time":12567,"x":"0.298","y":"0.257"},{"time":12676,"x":"0.298","y":"0.255"},{"time":12756,"x":"0.304","y":"0.265"},{"time":12834,"x":"0.340","y":"0.297"},{"time":12915,"x":"0.353","y":"0.305"},{"time":13892,"x":"0.493","y":"0.271","down":true,"color":"#000000"},{"time":14053,"x":"0.522","y":"0.255"},{"time":14132,"x":"0.540","y":"0.241"},{"time":14215,"x":"0.549","y":"0.231"},{"time":14349,"x":"0.549","y":"0.251"},{"time":14435,"x":"0.549","y":"0.289"},{"time":14515,"x":"0.549","y":"0.309"},{"time":14593,"x":"0.549","y":"0.321"},{"time":14674,"x":"0.549","y":"0.343"},{"time":15989,"x":"0.368","y":"0.373","down":true,"color":"#000000"},{"time":16121,"x":"0.368","y":"0.380"},{"time":16200,"x":"0.368","y":"0.404"},{"time":16280,"x":"0.368","y":"0.416"},{"time":16360,"x":"0.370","y":"0.428"},{"time":16439,"x":"0.370","y":"0.428"},{"time":17410,"x":"0.498","y":"0.369","down":true,"color":"#000000"},{"time":17542,"x":"0.498","y":"0.375"},{"time":17622,"x":"0.498","y":"0.396"},{"time":17728,"x":"0.498","y":"0.402"},{"time":17806,"x":"0.498","y":"0.412"},{"time":17912,"x":"0.498","y":"0.418"},{"time":18692,"x":"0.414","y":"0.456","down":true,"color":"#000000"},{"time":18852,"x":"0.417","y":"0.446"},{"time":18932,"x":"0.423","y":"0.430"},{"time":19015,"x":"0.426","y":"0.424"},{"time":19148,"x":"0.427","y":"0.424"},{"time":19225,"x":"0.438","y":"0.434"},{"time":19305,"x":"0.445","y":"0.442"},{"time":19388,"x":"0.445","y":"0.444"},{"time":22479,"x":"0.316","y":"0.309","down":true,"color":"#000000"},{"time":22611,"x":"0.316","y":"0.323"},{"time":22690,"x":"0.316","y":"0.345"},{"time":22853,"x":"0.316","y":"0.341"},{"time":22932,"x":"0.316","y":"0.319"},{"time":23015,"x":"0.316","y":"0.313"},{"time":23174,"x":"0.322","y":"0.315"},{"time":24479,"x":"0.513","y":"0.303","down":true,"color":"#000000"},{"time":24587,"x":"0.517","y":"0.297"},{"time":24717,"x":"0.522","y":"0.287"},{"time":24800,"x":"0.525","y":"0.279"},{"time":24876,"x":"0.525","y":"0.291"},{"time":24956,"x":"0.525","y":"0.301"},{"time":25039,"x":"0.525","y":"0.307"}]};
		this.mediator.publish("RECEIVE_PICTURE");
		this.canvas.drawPictureByPoints(picture.points);

		/*
		http.post("start-game/")
			.then(resp => {
				if (resp.status === 200) {
					return resp.json();
				}
				else {
					throw Error("log out");
				}
			})
			.then(picture => {
				this.mediator.publish("RECEIVE_PICTURE");
				this.canvas.drawPictureByPoints(picture.points);
			});
			*/
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
