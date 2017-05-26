"use strict";

import GameStrategy from "./game_strategy.js";
import Transport from "../transport.js";

export default class OfflineStrategy extends GameStrategy {
	constructor() {
		super();
		this.mediator.subscribe("NEW_SP_GAME", this.startGame.bind(this));
		this.mediator.subscribe("GET_ANSWER_OFFLINE", this.checkAnswer.bind(this));
		this.mediator.subscribe("STOP_GAME", this.stopGame.bind(this));
		this.mediator.subscribe("EXIT", this.exit.bind(this));

		this.startGame();
	}

	startGame() {
		let pictures;
		if (localStorage.getItem("picturesCache") === null || JSON.parse(localStorage.getItem("picturesCache")).length < 1) {
			this.mediator.publish("VIEW_LOADED");
			this.stopGame({result: 2});
			return;
		}
		else {
			pictures = JSON.parse(localStorage.getItem("picturesCache"));
			this.picture = pictures.pop();
			localStorage.setItem("picturesCache", JSON.stringify(pictures));
		}

		function starting() {
			this.mediator.publish("VIEW_LOADED");
			this.mediator.publish("START_SINGLE_PAINTING", this.picture);
			this.mediator.publish("START_TIMER", 30);
			this.mediator.publish("ENABLE_CHAT");
		}
		this.mediator.publish("SHOW_RULES");

		setTimeout(starting.bind(this), 3000);
	}

	checkAnswer(content) {
		if (this.picture.word == content.answer) {
			this.mediator.publish("STOP_GAME", {result: 1});
		}
	}

	stopGame(content) {
		this.mediator.publish("STOP_TIMER");
		this.mediator.publish("STOP_SINGLE_PAINTING");
		this.mediator.publish("SHOW_SP_RESULT", content.result);
	}

	exit() {
		this.unsubscribe();
		this.mediator.publish("DELETE_GAME");
	}

	unsubscribe() {
		this.mediator.unsubscribe("NEW_SP_GAME", this.startGame.bind(this));
		this.mediator.unsubscribe("STOP_GAME", this.stopGame.bind(this));
		this.mediator.unsubscribe("GET_ANSWER_OFFLINE", this.checkAnswer.bind(this));
		this.mediator.unsubscribe("EXIT", this.exit.bind(this));
	}

}

