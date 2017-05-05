"use strict";

import "./score_table.scss";
import template from "./score_table.pug";

export default class ScoreTable {
	constructor(players) {
		this.players = players;
		this.el = document.createElement("table");
	}

	setRating() {
		this.el.innerHTML = template({
			players: this.players
		});
	}

	render() {
		this.setRating();
		this.el.classList.add("score-table");
		return this;
	}
}
