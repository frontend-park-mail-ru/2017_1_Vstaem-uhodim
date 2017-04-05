"use strict";

import GameStrategy from "./game_strategy.js";

export default class SinglePlayerStrategy extends GameStrategy {
	constructor() {
		super();
		this.mediator.subscribe("START_GAME", this.startGame.bind(this));
		this.mediator.subscribe("RIGHT_ANSWER", this.stopGame.bind(this, 1));
		this.mediator.subscribe("RECEIVE_PICTURE", this.startTimer.bind(this));
		this.mediator.subscribe("FAILURE", this.stopGame.bind(this, 0));
	}

	startGame() {
		this.mediator.publish("SHOW_RULES");
		function starting() {
			this.mediator.publish("START_SINGLE_PAINTING");
		}

		setTimeout(starting.bind(this), 3000);
	}

	startTimer() {
		this.mediator.publish("START_TIMER");
	}

	stopGame(result) {
		this.mediator.publish("STOP_TIMER");
		this.mediator.publish("STOP_SINGLE_PAINTING");
		this.mediator.publish("SHOW_SINGLE_RESULT", result);
	}

}
