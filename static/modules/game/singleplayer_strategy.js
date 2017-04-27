"use strict";

import GameStrategy from "./game_strategy.js";
import Transport from "../transport.js";

export default class SinglePlayerStrategy extends GameStrategy {
	constructor() {
		super();
		this.transport = new Transport();
		this.mediator.subscribe("START_SP_GAME", this.startGame.bind(this));
		this.mediator.subscribe("STOP_GAME", this.stopGame.bind(this));

		this.transport.send("START_SP_GAME");
	}

	startGame(content) {
		this.mediator.publish("SHOW_RULES");
		function starting() {
			this.mediator.publish("START_SINGLE_PAINTING", content);
			this.mediator.publish("START_TIMER");
			this.mediator.publish("ENABLE_CHAT");
		}

		setTimeout(starting.bind(this), 3000);
	}

	stopGame(content) {
		this.mediator.publish("STOP_TIMER");
		this.mediator.publish("STOP_SINGLE_PAINTING");
		this.mediator.publish("SHOW_SP_RESULT", content.result);
	}

}
