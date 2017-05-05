"use strict";

import BaseView from "./base.js";
import Page from "../blocks/page/page.js";
import UserArea from "../blocks/user_area/user_area.js";
import ImageCroc from "../blocks/image_croc/image_croc.js";
import Menu from "../blocks/menu/menu.js";
import Shadow from "../blocks/shadow/shadow.js";
import WindowMenu from "../blocks/window_menu/window_menu.js";

export default class IndexView extends BaseView {

	async update() {
		const user = await this.currentUser();
		this.userArea.update(user);
		this.mediator.publish("VIEW_LOADED");
	}

	async render() {
		this.el.innerHTML = "";
		const indexLeftPage = new Page({
			type: "left"
		});

		indexLeftPage.render();

		this.el.appendChild(indexLeftPage.el);

		this.currentUser()
			.then(user => {
				this.userArea = new UserArea(user);
				this.userArea.render();
				if (document.querySelector("#main")) {
					indexLeftPage.el.insertBefore(this.userArea.el, document.querySelector("#main"));
				}
				else {
					indexLeftPage.el.appendChild(this.userArea.el);
				}
				this.mediator.publish("VIEW_LOADED");
			});

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
					click: openModeDialog.bind(this)
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


		this.shadow = new Shadow();
		this.shadow.render();

		this.el.appendChild(this.shadow.el);
		this.shadow.el.hidden = true;


		this.notAuthorizedMenu = new Menu({
			controls: [
				{
					text: "Авторизоваться",
					href: "/login",
					wide: true
				},
				{
					text: "Создать профиль",
					href: "/signup",
					wide: true
				}
			]
		});

		this.windowMenuNotAuthorized = new WindowMenu({title: "Присоединяйтесь, чтобы поиграть!", menu: this.notAuthorizedMenu});
		this.windowMenuNotAuthorized.render();

		this.el.appendChild(this.windowMenuNotAuthorized.el);
		this.windowMenuNotAuthorized.el.hidden = true;


		this.gameMenu = new Menu({
			controls: [
				{
					text: "Играть одному",
					href: "/game",
					wide: true,
					click: (() => {
						this.mediator.publish("SET_GAME_MODE", "single");
					}).bind(this)
				},
				{
					text: "Играть",
					href: "/game",
					wide: true,
					click: (() => {
						this.mediator.publish("SET_GAME_MODE", "multi");
					}).bind(this)
				},
				{
					text: "Найти комнату",
					href: "/",
					wide: true
				}
			]
		});

		this.windowMenuGameMode = new WindowMenu({title: "Выбор режима игры", menu: this.gameMenu});
		this.windowMenuGameMode.render();

		this.el.appendChild(this.windowMenuGameMode.el);
		this.windowMenuGameMode.el.hidden = true;

		this.shadow.el.addEventListener("click", closeDialog.bind(this));

		async function openModeDialog() {
			const user = await this.currentUser();

			if (user.type === "authorized") {
				this.shadow.el.hidden = false;
				this.windowMenuGameMode.el.hidden = false;
			}
			else {
				this.shadow.el.hidden = false;
				this.windowMenuNotAuthorized.el.hidden = false;
			}
		}

		function closeDialog() {
			this.shadow.el.hidden = true;
			this.windowMenuGameMode.el.hidden = true;
			this.windowMenuNotAuthorized.el.hidden = true;
		}
	}

	show() {
		BaseView.prototype.show.apply(this);
		this.shadow.el.hidden = true;
		this.windowMenuGameMode.el.hidden = true;
		this.windowMenuNotAuthorized.el.hidden = true;
		this.image.fixTail();
	}
}
