"use strict";

import GameStrategy from "./game_strategy.js";
import Transport from "../transport.js";

export default class SinglePlayerStrategy extends GameStrategy {
	constructor() {
		super();
		this.transport = new Transport();
		this.mediator.subscribe("START_SP_GAME", this.startGame.bind(this));
		this.mediator.subscribe("STOP_GAME", this.stopGame.bind(this));
		this.mediator.subscribe("NEW_SP_GAME", this.newSPGame.bind(this));
		this.mediator.subscribe("EXIT", this.exit.bind(this));

		this.mediator.publish("NEW_SP_GAME");
	}

	newSPGame() {
		this.transport.send("START_SP_GAME");
		this.mediator.publish("LOADING");
	}

	startGame(content) {
		this.mediator.publish("ENABLE_SINGLE_CHAT");
		this.mediator.publish("VIEW_LOADED");
		this.mediator.publish("SHOW_RULES");
		function starting() {
			this.mediator.publish("START_SINGLE_PAINTING", content);
			this.mediator.publish("START_TIMER", Math.abs(Math.round(content.current_time)));
			this.mediator.publish("ENABLE_CHAT");
		}

		setTimeout(starting.bind(this), 3000);
	}

	stopGame(content) {
		this.mediator.publish("STOP_TIMER");
		this.mediator.publish("STOP_SINGLE_PAINTING");
		this.mediator.publish("SHOW_SP_RESULT", content.result);
	}

	exit() {
		this.mediator.publish("CLEAR");
		this.mediator.publish("STOP_SINGLE_PAINTING");
		this.unsubscribe();
		this.mediator.publish("DELETE_GAME");
	}

	unsubscribe() {
		this.mediator.unsubscribe("START_SP_GAME", this.startGame.bind(this));
		this.mediator.unsubscribe("STOP_GAME", this.stopGame.bind(this));
		this.mediator.unsubscribe("NEW_SP_GAME", this.newSPGame.bind(this));
		this.mediator.unsubscribe("EXIT", this.exit.bind(this));
	}

}
