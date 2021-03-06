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
import MultiPlayerStrategy from "../modules/game/multiplayer_strategy.js";
import OfflineStrategy from "../modules/game/offline_strategy.js";
import Button from "../blocks/button/button.js";

const [CustomEvent] = [window.CustomEvent];

export default class GameView extends BaseView {
	constructor(el) {
		super(el);
		this.mediator.subscribe("SET_GAME_MODE", ((mode) => {
			if (mode === "single") {
				this.strategy = SinglePlayerStrategy;
			}
			if (mode === "multi") {
				this.strategy = MultiPlayerStrategy;
			}
			if (mode === "offline") {
				this.strategy = OfflineStrategy;
				this.mode = "offline";
			}
		}).bind(this));
	}

	render() {
		this.shadow = new Shadow();
		this.shadow.render();

		this.el.appendChild(this.shadow.el);
		this.shadow.el.hidden = true;

		this.menu = new Menu({
			controls: [
				{
					id: "new_game",
					text: "Новая игра!",
					action: true,
					click: (()=> {
						this.windowMenu.el.hidden = true;
						this.shadow.el.hidden = true;
						this.mediator.publish("NEW_SP_GAME");
					}).bind(this)
				},
				{
					text: "На главную",
					action: false,
					href: "/",
					click: (() => { this.mediator.publish("EXIT"); }).bind(this)
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
					href: "",
					click: (() => { this.mediator.publish("EXIT"); }).bind(this)
				}
			]
		});

		gameSinglePage.render();

		this.el.appendChild(gameSinglePage.el);

		this.timer = new Timer();
		this.timer.render();
		gameSinglePage.el.appendChild(this.timer.el);

		this.clear = new Button({text: "Очистить"});
		this.clear.render();
		this.clear.el.classList.add("button_type_clear");
		this.clear.el.style.visibility = "hidden";
		gameSinglePage.el.appendChild(this.clear.el);

		this.canvas = new Canvas({});
		this.canvas.render();
		gameSinglePage.el.appendChild(this.canvas.el);

		this.chat = new Chat();
		this.chat.render();

		this.chat.input.hidden = true;
		this.chat.submit.style.visibility = "hidden";

		gameSinglePage.el.appendChild(this.chat.el);
	}

	async show() {
		BaseView.prototype.show.apply(this);
		this.shadow.el.hidden = true;
		this.windowMenu.el.hidden = true;

		if (this.mode === "offline") {
			this.game = new Game(this.strategy, "", this.canvas, this.chat, this.timer, this.shadow, this.windowMenu, this.clear, "offline");
			this.game.username = "Вы";
			return;
		}

		if (this.strategy === undefined) {
			document.dispatchEvent(new CustomEvent("redirect", {detail: "/"}));
		}
		else {
			const user = await this.currentUser();
			this.game = new Game(this.strategy, "", this.canvas, this.chat, this.timer, this.shadow, this.windowMenu, this.clear);
			this.game.username = user.nickname;
		}
	}

}
