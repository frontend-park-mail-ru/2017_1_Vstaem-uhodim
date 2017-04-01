"use strict";

import GameStrategy from "./game_strategy.js";

export default class SinglePlayerStrategy extends GameStrategy {
	constructor() {
		super();
		this.mediator.subscribe("START_GAME", this.startGame.bind(this));
		this.mediator.subscribe("RIGHT_ANSWER", this.stopGame.bind(this));
	}

	startGame() {
		this.mediator.publish("SHOW_RULES");
		function starting() {
			this.mediator.publish("START_TIMER");
			this.mediator.publish("START_SINGLE_PAINTING");
		}

		setTimeout(starting.bind(this), 3000);
	}

	stopGame() {
		this.mediator.publish("STOP_TIMER");
		this.mediator.publish("STOP_SINGLE_PAINTING");
		this.mediator.publish("SHOW_SINGLE_RESULT");
	}

}
