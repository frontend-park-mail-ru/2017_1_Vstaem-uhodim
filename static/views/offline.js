"use strict";

import BaseView from "./base.js";
import Page from "../blocks/page/page.js";
import Canvas from "../blocks/canvas/canvas.js";

export default class OfflineView extends BaseView {
	render() {
		const offlineSinglePage = new Page({
			type: "game",
			notification: "Чтобы поиграть необходимо подключиться к сети, а пока можно просто порисовать!",
			controls: []
		});

		offlineSinglePage.render();

		this.el.appendChild(offlineSinglePage.el);

		this.canvas = new Canvas({
			wide: true
		});
		this.canvas.render();
		offlineSinglePage.el.appendChild(this.canvas.el);
		this.canvas.paint();

		this.mediator.publish("VIEW_LOADED");
	}
}
