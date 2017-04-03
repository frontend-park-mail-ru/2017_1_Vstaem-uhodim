"use strict";

import BaseView from "./base.js";
import Page from "../blocks/page/page.js";
import UserArea from "../blocks/user_area/user_area.js";
import ImageCroc from "../blocks/image_croc/image_croc.js";
import Menu from "../blocks/menu/menu.js";
import Shadow from "../blocks/shadow/shadow.js";
import WindowMenu from "../blocks/window_menu/window_menu.js";
import HTTP from "../modules/http.js";

export default class IndexView extends BaseView {

	currentUser() {
		let http = new HTTP();
		return new Promise((resolve) => {
			http.get("who-am-i/")
				.then(resp => {
					if (resp.status === 200) {
						return resp.json();
					}
					else {
						throw Error("log out");
					}
				})
				.then(user => {
					resolve({
						type: "authorized",
						nickname: user.login,
						score: user.rating
					});
				}, () => {
					resolve({
						type: "notAuthorized",
						nickname: "",
						score: ""
					});
				});
		});
	}

	update() {

		this.currentUser()
			.then(user => {
				this.userArea.update(user);
			});

	}

	render() {
		this.el.innerHTML = "";
		const indexLeftPage = new Page({
			type: "left"
		});

		indexLeftPage.render();

		this.el.appendChild(indexLeftPage.el);

		let userArea = null;


		this.currentUser()
			.then(user => {
				userArea = new UserArea(user);

				userArea.render();
				this.userArea = userArea;

				if (document.querySelector("#main")) {
					indexLeftPage.el.insertBefore(userArea.el, document.querySelector("#main"));
				}
				else {
					indexLeftPage.el.appendChild(userArea.el);
				}
			});


		const image = new ImageCroc();
		image.render();

		indexLeftPage.el.appendChild(image.el);
		image.fixTail();

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
					id: "js-index-game",
					click: openDialog.bind(this)
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
			image.fixTail();
		});


		this.shadow = new Shadow();
		this.shadow.render();

		this.el.appendChild(this.shadow.el);
		this.shadow.el.hidden = true;

		this.gameMenu = new Menu({
			controls: [
				{
					text: "Играть одному",
					id: "js-index-game",
					href: "/game"
				},
				{
					text: "Найти комнату",
					action: false,
					href: "/"
				}
			]
		});

		this.windowMenu = new WindowMenu({title: "Выбор режима", menu: this.gameMenu});
		this.windowMenu.render();

		this.shadow.el.addEventListener("click", closeDialog.bind(this));

		function openDialog() {
			this.shadow.el.hidden = false;
			this.windowMenu.el.hidden = false;
		}

		function closeDialog() {
			this.shadow.el.hidden = true;
			this.windowMenu.el.hidden = true;
		}

		this.el.appendChild(this.windowMenu.el);
		this.windowMenu.el.hidden = true;

		this.rendered = true;
	}

	show() {
		BaseView.prototype.show.apply(this);
		this.shadow.el.hidden = true;
		this.windowMenu.el.hidden = true;
	}
}
