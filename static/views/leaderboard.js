"use strict";

import BaseView from "./base.js";
import Page from "../blocks/page/page.js";
import ScoreTable from "../blocks/score_table/score_table.js";
import HTTP from "../modules/http.js";

export default class LeaderboardView extends BaseView {

	bests() {
		let http = new HTTP();

		return new Promise((resolve, reject) => {
			http.get('best/')
				.then(resp => {
					if (resp.status === 200) {
						return resp.json();
					}
				})
				.then(players => {
					resolve(players);
				});
		});
	}

	render() {
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


		this.bests()
			.then(players => {
				players.forEach((player, number) => {
					player.number = number + 1;
				});
				firstScoreTable = new ScoreTable(players);
				firstScoreTable.render();
				leaderboardSinglePage.el.appendChild(firstScoreTable.el);
			});
	}
}
