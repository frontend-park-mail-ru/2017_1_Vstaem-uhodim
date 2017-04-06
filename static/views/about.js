"use strict";

import BaseView from "./base.js";
import Page from "../blocks/page/page.js";
import TextParagraph from "../blocks/text_paragraph/text_paragraph.js";

export default class AboutView extends BaseView {
	render() {

		const aboutLeftPage = new Page({
			title: "Крокодил:",
			type: "left",
			controls: [
				{
					text: "&#8630",
					href: ""
				}
			]
		});

		aboutLeftPage.render();

		this.el.appendChild(aboutLeftPage.el);

		const aboutGame = new TextParagraph({
			title: "Правила:",
			text: "Смысл игры состоит в том, чтобы отгадать загаданное слово <br><br>" +
			"Можно играть одному, угадывая картинки и зарабатывая за это рейтинг <br>" +
			"А можно играть с другими игроками, не просто отгадывая, но и рисуя <br><br>" +
			"Один игрок рисует слово на страничке, остальные угадывают ответ в чате <br>"
		});

		aboutGame.render();

		aboutLeftPage.el.appendChild(aboutGame.el);

		const aboutRightPage = new Page({
			title: "Список:",
			type: "right"
		});

		aboutRightPage.render();

		this.el.appendChild(aboutRightPage.el);

		const firstPar = new TextParagraph({
			title: "Авторы:",
			text: "1: <br> <br>" +
			"2: <br>"
		});

		firstPar.render();

		aboutRightPage.el.appendChild(firstPar.el);
	}
}
