"use strict";

import GameStrategy from "./game_strategy.js";
import Transport from "../transport.js";

export default class MultiPlayerStrategy extends GameStrategy {
	constructor() {
		super();
		this.transport = new Transport();
		this.mediator.subscribe("START_MP_GAME", this.startGame.bind(this));
		this.mediator.subscribe("NEW_POINT", this.newPoint.bind(this));
		this.mediator.subscribe("GET_ANSWER", this.newMessage.bind(this));
		this.mediator.subscribe("STOP_GAME", this.stopGame.bind(this));
		this.mediator.subscribe("EXIT", this.exit.bind(this));

		this.transport.send("START_MP_GAME");
		this.mediator.publish("LOADING");
	}

	startGame(content) {
		this.mediator.publish("VIEW_LOADED");
		this.mediator.publish("HIDE_RESULT");
		this.mediator.publish("RESET_CHAT");
		if (content.type !== "mp") {
			return;
		}
		switch (content.role) {
			case "main":
				this.mediator.publish("DISABLE_CHAT");
				this.mediator.publish("ENABLE_PAINTING", content.word);
				break;
			case "other":
				this.mediator.publish("ENABLE_CHAT");
				break;
			default:
				return;
		}
		content.players.forEach(player => {
			this.mediator.publish("ADD_PLAYER", player);
		});

		this.mediator.publish("START_TIMER", content.timer);
	}

	newPoint(content) {
		this.mediator.publish("DRAW_ONE_POINT", content);
	}

	newMessage(content) {
		this.mediator.publish("NEW_MESSAGE", {player: content.player, color: content.color, answer: content.answer});
	}

	stopGame(content) {
		this.mediator.publish("STOP_TIMER");
		this.mediator.publish("DISABLE_PAINTING");
		this.mediator.publish("SHOW_MP_RESULT", content);
		setTimeout(() => {
			this.transport.send("START_MP_GAME");
			this.mediator.publish("LOADING");
		}, 5000);
	}

	exit() {
		this.transport.send("EXIT", {});
		//this.transport.close();
		this.mediator.publish("STOP_TIMER");
		this.mediator.publish("DISABLE_PAINTING");
		this.mediator.publish("HIDE_RESULT");

	}
}
