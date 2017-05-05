"use strict";

import Mediator from "../mediator.js";
import Transport from "../transport.js";

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
		this.transport = new Transport();


		this.mediator.subscribe("START_TIMER", this.startTimer.bind(this));
		this.mediator.subscribe("START_SINGLE_PAINTING", this.startSinglePainting.bind(this));
		this.mediator.subscribe("STOP_TIMER", this.stopTimer.bind(this));
		this.mediator.subscribe("STOP_SINGLE_PAINTING", this.stopSinglePainting.bind(this));
		this.mediator.subscribe("SHOW_SP_RESULT", this.showSPResult.bind(this));
		this.mediator.subscribe("SHOW_RULES", this.showRules.bind(this));

		this.mediator.subscribe("DISABLE_CHAT", this.disableChat.bind(this));
		this.mediator.subscribe("ENABLE_CHAT", this.enableChat.bind(this));
		this.mediator.subscribe("ENABLE_PAINTING", this.enablePainting.bind(this));
		this.mediator.subscribe("DISABLE_PAINTING", this.disablePainting.bind(this));
		this.mediator.subscribe("ADD_PLAYER", this.addPlayer.bind(this));
		this.mediator.subscribe("NEW_MESSAGE", this.newMessage.bind(this));
		this.mediator.subscribe("SHOW_MP_RESULT", this.showMPResult.bind(this));
		this.mediator.subscribe("HIDE_RESULT", this.hideResult.bind(this));
		this.mediator.subscribe("RESET_CHAT", this.resetChat.bind(this));
		this.mediator.subscribe("DRAW_ONE_POINT", this.drawPoint.bind(this));
		this.mediator.subscribe("DELETE_GAME", this.del.bind(this));

		this.chat.el.addEventListener("submit", async (event) => {
			this.transport.send("GET_ANSWER", {answer: event.detail});
		});

		this.timer.el.addEventListener("stop", () => {
			this.mediator.publish("FAILURE");
		});

		this.colors = ["#736af2", "#73c3dd", "#77d870", "#fff55e", "#fcbe53", "#ff4949"];

		this.canvas.fixSize();

	}

	start() {
		this.shadow.el.hidden = true;
		this.windowMenu.setTitle("");
		this.windowMenu.el.hidden = true;
		this.timer.el.innerHTML = "Игра скоро начнется...";
		this.mediator.publish("START_GAME");
	}

	startTimer() {
		this.timer.start();
	}

	stopTimer() {
		this.timer.stop();
	}

	async startSinglePainting(content) {
		this.canvas.drawPictureByPoints(content.points);
	}

	stopSinglePainting() {
		this.canvas.stopSinglePainting = true;
	}

	showSPResult(result) {
		this.chat.reset();
		this.canvas.reset();
		this.timer.stop();

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

	disableChat() {
		this.chat.input.hidden = true;
		this.chat.submit.hidden = true;
	}

	enableChat() {
		this.chat.reset();
		this.chat.input.hidden = false;
		this.chat.submit.hidden = false;
	}

	enablePainting(word) {
		this.canvas.hideResult();
		this.canvas.paint(word);
	}

	disablePainting() {
		this.canvas.reset();
		this.canvas.disablePaint();
	}

	addPlayer(player) {
		this.chat.addUser(player.login, this.colors[player.color]);
		if (player.login === this.username) {
			this.color = this.colors[player.color];
		}
	}

	showMPResult(content) {
		this.canvas.showMPResult(content);
	}

	hideResult(word) {
		this.canvas.hideResult();
	}

	resetChat() {
		this.chat.players.innerHTML = "";
		this.chat.list.innerHTML = "";
	}

	newMessage(message) {
		if (this.username !== message.player) {
			this.chat.addMessage(message.player, message.answer, message.color);
		}
	}

	drawPoint(point) {
		this.canvas.addPoint(point);
	}

	del() {
		this.mediator.unsubscribe("START_TIMER", this.startTimer.bind(this));
		this.mediator.unsubscribe("START_SINGLE_PAINTING", this.startSinglePainting.bind(this));
		this.mediator.unsubscribe("STOP_TIMER", this.stopTimer.bind(this));
		this.mediator.unsubscribe("STOP_SINGLE_PAINTING", this.stopSinglePainting.bind(this));
		this.mediator.unsubscribe("SHOW_SP_RESULT", this.showSPResult.bind(this));
		this.mediator.unsubscribe("SHOW_RULES", this.showRules.bind(this));

		this.mediator.unsubscribe("DISABLE_CHAT", this.disableChat.bind(this));
		this.mediator.unsubscribe("ENABLE_CHAT", this.enableChat.bind(this));
		this.mediator.unsubscribe("ENABLE_PAINTING", this.enablePainting.bind(this));
		this.mediator.unsubscribe("DISABLE_PAINTING", this.disablePainting.bind(this));
		this.mediator.unsubscribe("ADD_PLAYER", this.addPlayer.bind(this));
		this.mediator.unsubscribe("NEW_MESSAGE", this.newMessage.bind(this));
		this.mediator.unsubscribe("SHOW_MP_RESULT", this.showMPResult.bind(this));
		this.mediator.unsubscribe("HIDE_RESULT", this.hideResult.bind(this));
		this.mediator.unsubscribe("RESET_CHAT", this.resetChat.bind(this));
		this.mediator.unsubscribe("DRAW_ONE_POINT", this.drawPoint.bind(this));
		this.mediator.unsubscribe("DELETE_GAME", this.del.bind(this));
	}
}
