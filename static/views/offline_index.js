"use strict";

import BaseView from "./base.js";
import Page from "../blocks/page/page.js";
import UserArea from "../blocks/user_area/user_area.js";
import ImageCroc from "../blocks/image_croc/image_croc.js";
import Menu from "../blocks/menu/menu.js";

export default class OfflineIndexView extends BaseView {

	render() {
		this.el.innerHTML = "";
		const indexLeftPage = new Page({
			type: "left"
		});

		indexLeftPage.render();

		this.el.appendChild(indexLeftPage.el);

		this.userArea = new UserArea({
			type: "offline",
			nickname: "",
			score: ""
		});
		this.userArea.render();
		indexLeftPage.el.appendChild(this.userArea.el);

		this.image = new ImageCroc();
		this.image.render();

		indexLeftPage.el.appendChild(this.image.el);
		this.image.fixTail();

		const indexRightPage = new Page({
			type: "right"
		});

		indexRightPage.render();

		this.el.appendChild(indexRightPage.el);

		indexRightPage.el.innerHTML += "<h1 class=\"page__title_main\">Крокодил</h1>";

		const menu = new Menu({
			controls: [
				{
					text: "Играть!",
					action: true,
					main: true,
					id: "js-index-game",
					href: "/game"
				},
				{
					text: "Рейтинг",
					action: false,
					id: "js-index-leaderboard",
					href: "/leaderboard"
				},
				{
					text: "Об игре",
					action: false,
					id: "js-index-about",
					href: "/about"
				},
			]
		});

		menu.render();

		indexRightPage.el.appendChild(menu.el);

		window.addEventListener("resize", () => {
			this.image.fixTail();
		});


		this.mediator.publish("VIEW_LOADED");
	}

	show() {
		BaseView.prototype.show.apply(this);
		this.image.fixTail();
	}
}

