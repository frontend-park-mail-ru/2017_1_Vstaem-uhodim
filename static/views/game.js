"use strict";

import BaseView from "./base.js";
import Page from "../blocks/page/page.js";
import Canvas from "../blocks/canvas/canvas.js";
import Chat from "../blocks/chat/chat.js";
import Shadow from "../blocks/shadow/shadow.js";
import WindowMenu from "../blocks/window_menu/window_menu.js";
import Menu from "../blocks/menu/menu.js";
import Timer from "../blocks/timer/timer.js";
import Game from "../modules/game/game.js";
import SinglePlayerStrategy from "../modules/game/singleplayer_strategy.js";

const [CustomEvent] = [window.CustomEvent];

export default class GameView extends BaseView {

	render() {
		this.shadow = new Shadow();
		this.shadow.render();

		this.el.appendChild(this.shadow.el);
		this.shadow.el.hidden = true;

		this.menu = new Menu({
			controls: [
				{
					text: "Новая игра!",
					action: true,
					id: "js-index-game",
					href: "/game"
				},
				{
					text: "На главную",
					action: false,
					href: "/"
				}
			]
		});

		this.windowMenu = new WindowMenu({title: "", menu: this.menu});
		this.windowMenu.render();

		this.el.appendChild(this.windowMenu.el);
		this.windowMenu.el.hidden = true;

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

		this.timer = new Timer();
		this.timer.render();
		gameSinglePage.el.appendChild(this.timer.el);

		this.canvas = new Canvas();
		this.canvas.render();
		gameSinglePage.el.appendChild(this.canvas.el);

		this.chat = new Chat();
		this.chat.render();
		gameSinglePage.el.appendChild(this.chat.el);
		this.chat.el.addEventListener("submit", () => {
			if (this.chat.getMessage() !== "") {
				this.chat.addMessage("Вы", this.chat.getMessage(), "black");
				this.chat.resetMessage();
			}
		});

		this.game = new Game(SinglePlayerStrategy, "", this.canvas, this.chat, this.timer, this.shadow, this.windowMenu);
	}

	async show() {
		BaseView.prototype.show.apply(this);
		this.shadow.el.hidden = true;
		this.windowMenu.el.hidden = true;

		const user = await this.currentUser();
		if (user.type === "authorized") {
			this.game.start();
		}
		else {
			document.dispatchEvent(new CustomEvent("redirect", {detail: "/"}));
		}
	}


}
