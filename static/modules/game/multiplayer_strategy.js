"use strict";

import GameStrategy from "./game_strategy.js";

export default class MultiPlayerStrategy extends GameStrategy {
	constructor() {
		this.mediator.subscribe("START_MP_GAME", this.startGame.bind(this));
		this.mediator.subscribe("NEW_POINT", this.newPoint.bind(this));
		this.mediator.subscribe("GET_ANSWER", this.newMessage.bind(this));
		this.mediator.subscribe("STOP_GAME", this.stopGame.bind(this));
	}

	startGame(content) {
		if (content.game_type !== "multi") {
			return;
		}
		switch (content.role) {
			case "main":
				this.mediator.publish("DISABLE_CHAT");
				break;
			case "other":
				this.mediator.publish("DISABLE_PAINTING");
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
		this.mediator.publish("NEW_MESSAGE", {player: content.player, color: content.color, message: content.answer});
	}

	stopGame(content) {
		this.mediator.publish("STOP_TIMER");
		this.mediator.publish("STOP_PAINTING");
		this.mediator.publish("SHOW_MP_RESULT", {word: content.word, winner: content.winer});
	}
}
