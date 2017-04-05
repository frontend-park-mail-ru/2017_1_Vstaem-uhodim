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
			text: "Смысл игры состоит в том, чтобы отгадать загаданное слово. Один игрок рисует " +
			"слово на страничке, остальные угадывают ответ в чате."
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
			title: "Человек 1",
			text: "Some text some text some text some text some text"
		});

		firstPar.render();

		aboutRightPage.el.appendChild(firstPar.el);

		const secPar = new TextParagraph({
			title: "Человек 2",
			text: "Some text some text some text some text some text"
		});

		secPar.render();

		aboutRightPage.el.appendChild(secPar.el);

		const otherPar = new TextParagraph({
			title: "...",
			text: "Some text some text some text some text some text"
		});

		otherPar.render();

		aboutRightPage.el.appendChild(otherPar.el);

		this.rendered = true;
	}
}
