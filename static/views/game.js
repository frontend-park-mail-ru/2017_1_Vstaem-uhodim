"use strict";

import BaseView from "./base.js";
import Page from "../blocks/page/page.js";
import Canvas from "../blocks/canvas/canvas.js";

export default class GameView extends BaseView {


	render() {
		const gameSinglePage = new Page({
			type: "game",
			controls: [
				{
					text: "&#8630",
					href: ""
				}
			]
		});

		gameSinglePage.render();

		this.el.appendChild(gameSinglePage.el);

		const canvas = new Canvas();
		canvas.render();
		gameSinglePage.el.appendChild(canvas.el);
		canvas.paint();
	}
}
