"use strict";

import Mediator from "../mediator.js";
import Transport from "../transport.js";


export default class Game {
	constructor(Strategy, username, canvas, chat, timer, shadow, windowMenu, mode) {

		this.username = username;
		this.canvas = canvas;
		this.chat = chat;
		this.timer = timer;
		this.shadow = shadow;
		this.windowMenu = windowMenu;
		this.mediator = new Mediator();

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
		this.mediator.subscribe("DELETE_PLAYER", this.deletePlayer.bind(this));
		this.mediator.subscribe("NEW_MESSAGE", this.newMessage.bind(this));
		this.mediator.subscribe("SHOW_MP_RESULT", this.showMPResult.bind(this));
		this.mediator.subscribe("HIDE_RESULT", this.hideResult.bind(this));
		this.mediator.subscribe("RESET_CHAT", this.resetChat.bind(this));
		this.mediator.subscribe("DRAW_ONE_POINT", this.drawPoint.bind(this));
		this.mediator.subscribe("DELETE_GAME", this.del.bind(this));
		this.mediator.subscribe("VOTE_MESSAGE", this.vote.bind(this));
		this.mediator.subscribe("NEW_VOTE", this.newVote.bind(this));
		this.mediator.subscribe("ENABLE_SINGLE_CHAT", this.enableSingleChat.bind(this));
		this.mediator.subscribe("DRAW_POINTS", this.drawPoints.bind(this));

		this.strategy = new Strategy();
		if (mode !== "offline") {
			this.transport = new Transport();
			this.transport.open();
		}
		else {
			this.mode = "offline";
		}

		this.chat.el.addEventListener("submit", (event) => {
			if (event.detail.toLowerCase() !== "") {
				if (this.mode === "offline") {
					this.mediator.publish("GET_ANSWER_OFFLINE", {answer: event.detail.toLowerCase()})
				}
				else {
					this.transport.send("GET_ANSWER", {answer: event.detail.toLowerCase()});
				}
				this.chat.setFocus();
			}
		});

		this.timer.el.addEventListener("stop", () => {
			this.mediator.publish("FAILURE");
		});

		this.chat.fixListSize();

		this.colors = ["#736af2", "#73c3dd", "#77d870", "#8c5887", "#fcbe53", "#ff4949"];

		this.canvas.fixSize();

	}

	start() {
		this.shadow.el.hidden = true;
		this.windowMenu.setTitle("");
		this.windowMenu.el.hidden = true;
		this.timer.el.innerHTML = "Игра скоро начнется...";
		this.mediator.publish("START_GAME");
	}

	startTimer(time) {
		this.timer.start(time);
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
		if (result === 1) {
			title = "Вы угадали!";
		}
		if (result === 2) {
			title = "Картинки закончились...";
			this.windowMenu.removeNewGameButton("new_game");
		}

		this.windowMenu.setTitle(title);
		this.windowMenu.el.hidden = false;
	}

	showRules() {
		this.chat.addServiceMessage("Задача: угадать, что будет нарисовано на картинке и написать ответ в чат");
	}

	disableChat() {
		this.chat.input.hidden = true;
		this.chat.submit.style.visibility = "hidden";
	}

	enableChat() {
		this.chat.reset();
		this.chat.input.hidden = false;
		this.chat.submit.style.visibility = "visible";
		this.chat.setFocus();
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
		this.chat.addUser(player.login, this.colors[player.color], player.new);
		if (player.login === this.username) {
			this.color = this.colors[player.color];
		}
	}

	deletePlayer(nickname) {
		this.chat.deleteUser(nickname)
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
		this.chat.addMessage({author: message.player, answer: message.answer, color: this.colors[message.color], main: this.strategy.main, id: message.id});
		if (this.username === message.player) {
			this.chat.resetMessage();
		}
	}

	drawPoint(point) {
		this.canvas.addPoint(point);
	}

	vote(content) {
		this.transport.send("VOTE_ANSWER", content);
	}

	newVote(vote) {
		if (!this.strategy.main) {
			this.chat.updateMessage(vote.id, vote.vote);
		}
	}

	enableSingleChat() {
		this.chat.el.addEventListener("submit", () => {
			if (this.chat.getMessage() !== "") {
				this.chat.addMessage({author: this.username, answer: this.chat.getMessage(), color: this.color || "black"});
				this.chat.resetMessage();
				this.chat.setFocus();
			}
		});
	}

	drawPoints(points) {
		this.canvas.drawPictureByPoints(points, true);
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
		this.mediator.unsubscribe("DELETE_PLAYER", this.deletePlayer.bind(this));
		this.mediator.unsubscribe("NEW_MESSAGE", this.newMessage.bind(this));
		this.mediator.unsubscribe("SHOW_MP_RESULT", this.showMPResult.bind(this));
		this.mediator.unsubscribe("HIDE_RESULT", this.hideResult.bind(this));
		this.mediator.unsubscribe("RESET_CHAT", this.resetChat.bind(this));
		this.mediator.unsubscribe("DRAW_ONE_POINT", this.drawPoint.bind(this));
		this.mediator.unsubscribe("DELETE_GAME", this.del.bind(this));
		this.mediator.unsubscribe("VOTE_MESSAGE", this.vote.bind(this));
		this.mediator.unsubscribe("NEW_VOTE", this.newVote.bind(this));
		this.mediator.unsubscribe("ENABLE_SINGLE_CHAT", this.enableSingleChat.bind(this));
		this.mediator.unsubscribe("DRAW_POINTS", this.drawPoints.bind(this));

		const clone = this.chat.el.cloneNode();
		while (this.chat.el.firstChild) {
			clone.appendChild(this.chat.el.firstChild);
		}
		this.chat.el.parentNode.replaceChild(clone, this.chat.el);
		this.chat.el = clone;
		this.transport.close();
		this.resetChat();
	}
}
