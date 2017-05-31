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

				const picture = JSON.parse('{"points":[{"time":1711,"x":"0.306","y":"0.350","down":true,"color":"#000000"},{"time":1837,"x":"0.309","y":"0.380"},{"time":1917,"x":"0.332","y":"0.546"},{"time":1997,"x":"0.338","y":"0.660"},{"time":2078,"x":"0.347","y":"0.770"},{"time":2158,"x":"0.347","y":"0.796"},{"time":2289,"x":"0.347","y":"0.810"},{"time":2927,"x":"0.356","y":"0.828","down":true,"color":"#000000"},{"time":3086,"x":"0.389","y":"0.828"},{"time":3164,"x":"0.484","y":"0.816"},{"time":3244,"x":"0.555","y":"0.810"},{"time":3324,"x":"0.585","y":"0.810"},{"time":3407,"x":"0.609","y":"0.810"},{"time":3487,"x":"0.633","y":"0.812"},{"time":3569,"x":"0.659","y":"0.812"},{"time":3649,"x":"0.679","y":"0.814"},{"time":3731,"x":"0.704","y":"0.814"},{"time":3811,"x":"0.724","y":"0.814"}]}');
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

		const time = (content.current_time !== "Infinity") ? Math.round(content.current_time) : content.timer;
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
