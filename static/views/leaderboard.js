"use strict";

import BaseView from "./base.js";
import Page from "../blocks/page/page.js";
import ScoreTable from "../blocks/score_table/score_table.js";
import HTTP from "../modules/http.js";

export default class LeaderboardView extends BaseView {

	async bests() {
		const http = new HTTP();

		const resp = await http.get("best/");
		if (resp.status === 200) {
			const bests = resp.json();
			return bests;
		}
		else {
			return [];
		}
	}

	async setTable() {
		const players = await this.bests();
		players.forEach((player, number) => {
			player.number = number + 1;
		});
		this.firstScoreTable = new ScoreTable(players);
		this.firstScoreTable.render();
		this.leaderboardSinglePage.el.appendChild(this.firstScoreTable.el);
	}

	async render() {
		this.el.innerHTML = "";

		this.leaderboardSinglePage = new Page({
			title: "Лучшие:",
			type: "single",
			controls: [
				{
					text: "&#8630",
					href: ""
				}
			]
		});

		this.leaderboardSinglePage.render();

		this.el.appendChild(this.leaderboardSinglePage.el);
		await this.setTable();
	}

	update () {
		this.firstScoreTable.el.remove();
		this.setTable();
	}
}
