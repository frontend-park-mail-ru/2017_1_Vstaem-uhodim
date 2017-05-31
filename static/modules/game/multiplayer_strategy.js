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
		this.mediator.subscribe("PLAYERS_CONNECT", this.newUser.bind(this));
		this.mediator.subscribe("PLAYER_DISCONNECT", this.deleteUser.bind(this));

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
				this.main = true;
				break;
			case "other":
				this.mediator.publish("ENABLE_CHAT");
				if (content.points.length > 2) {
					this.mediator.publish("DRAW_POINTS", content.points);
				}
				this.main = false;
				break;
			default:
				return;
		}
		content.players.forEach(player => {
			this.mediator.publish("ADD_PLAYER", player);
		});

		const time = content.current_time !== "Infinity" ? Math.round(content.current_time) : content.timer;
		this.mediator.publish("START_TIMER", time);
	}

	newPoint(content) {
		this.mediator.publish("DRAW_ONE_POINT", content);
	}

	newMessage(content) {
		this.mediator.publish("NEW_MESSAGE", {player: content.player, color: content.color, answer: content.answer, id: content.id});
	}

	stopGame(content) {
		this.mediator.publish("STOP_TIMER");
		this.mediator.publish("DISABLE_PAINTING");
		this.mediator.publish("SHOW_MP_RESULT", content);
		this.timeout = setTimeout(() => {
			this.transport.send("START_MP_GAME");
			this.mediator.publish("LOADING");
		}, 5000);
	}

	exit() {
		clearTimeout(this.timeout);
		this.transport.send("EXIT", {});
		//this.transport.close();
		this.mediator.publish("STOP_TIMER");
		this.mediator.publish("DISABLE_PAINTING");
		this.mediator.publish("HIDE_RESULT");
		this.unsubscribe();
	}

	newUser(content) {
		content.players.forEach(player => {
			this.mediator.publish("ADD_PLAYER", player);
		});
	}

	deleteUser(content) {
		this.mediator.publish("DELETE_PLAYER", content.player);
	}

	unsubscribe() {
		this.mediator.unsubscribe("START_MP_GAME", this.startGame.bind(this));
		this.mediator.unsubscribe("NEW_POINT", this.newPoint.bind(this));
		this.mediator.unsubscribe("GET_ANSWER", this.newMessage.bind(this));
		this.mediator.unsubscribe("STOP_GAME", this.stopGame.bind(this));
		this.mediator.unsubscribe("EXIT", this.exit.bind(this));
		this.mediator.unsubscribe("PLAYERS_CONNECT", this.newUser.bind(this));
		this.mediator.unsubscribe("PLAYER_DISCONNECT", this.deleteUser.bind(this));
		this.mediator.publish("DELETE_GAME");
	}
}
