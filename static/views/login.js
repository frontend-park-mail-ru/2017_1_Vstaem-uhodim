"use strict";

import BaseView from "./base.js";
import Page from "../blocks/page/page.js";
import Form from "../blocks/form/form.js";
import HTTP from "../modules/http.js";
const CustomEvent = window.CustomEvent;

export default class LoginView extends BaseView {
	render() {
		let http = new HTTP();

		const loginSinglePage = new Page({
			title: "Авторизация",
			type: "single",
			controls: [
				{
					text: "&#8630",
					href: ""
				}
			]
		});

		loginSinglePage.render();
		this.el.appendChild(loginSinglePage.el);


		const loginForm = new Form(
			{
				fields: [
					{
						label: "Nickname:",
						attributes: {
							type: "text",
							id: "js-login-nickname",
							type_attr: "login"
						}
					},
					{
						label: "Пароль:",
						attributes: {
							placeholder: "",
							type: "password",
							id: "js-login-password",
							type_attr: "password"
						}
					}
				],
				control: {
					text: "Авторизоваться!",
					type_attr: "js-login-submit"
				}
			}
		);

		loginForm.render();

		loginSinglePage.el.appendChild(loginForm.el);

		loginSinglePage.el.addEventListener("backtoindex", () => {
			loginForm.reset();
		});

		loginForm.el.addEventListener("submit", async (event) => {
			event.preventDefault();
			if (loginForm.isValid()) {
				let resp = await http.post("login/", loginForm.getValues());
				if (resp.status === 200) {
					resp = await http.get("who-am-i/");
					document.dispatchEvent(new CustomEvent("redirect", {detail: "/"}));
				}
				else {
					const error = await resp.json();
					switch (error.code) {
						case "forbidden":
							loginForm.showErrorByType("login", "");
							loginForm.showErrorByType("password", "Неправильно!");
					}
				}
			}
		});

		this.rendered = true;
	}
}
