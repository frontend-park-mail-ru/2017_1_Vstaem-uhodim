"use strict";

import BaseView from "./base.js";
import Page from "../blocks/page/page.js";
import ScoreTable from "../blocks/score_table/score_table.js";
import HTTP from "../modules/http.js";

export default class LeaderboardView extends BaseView {

	async bests() {
		let http = new HTTP();

		const resp = await http.get("best/");
		if (resp.status === 200) {
			const bests = resp.json();
			return bests;
		}
		else {
			console.log("failed to get bests");
			return [];
		}
	}

	async render() {
		this.el.innerHTML = "";

		const leaderboardSinglePage = new Page({
			title: "Лучшие:",
			type: "single",
			controls: [
				{
					text: "&#8630",
					href: ""
				}
			]
		});

		leaderboardSinglePage.render();

		this.el.appendChild(leaderboardSinglePage.el);

		let firstScoreTable;

		const players = await this.bests();
		players.forEach((player, number) => {
			player.number = number + 1;
		});
		firstScoreTable = new ScoreTable(players);
		firstScoreTable.render();
		leaderboardSinglePage.el.appendChild(firstScoreTable.el);

		this.rendered = false;
	}
}
