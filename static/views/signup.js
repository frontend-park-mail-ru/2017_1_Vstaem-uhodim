"use strict";

import BaseView from "./base.js";
import Page from "../blocks/page/page.js";
import Form from "../blocks/form/form.js";
import HTTP from "../modules/http.js";
const [CustomEvent] = [window.CustomEvent];

export default class SignupView extends BaseView {

	render() {
		const http = new HTTP();

		const signupSinglePage = new Page({
			title: "Регистрация",
			type: "single",
			controls: [
				{
					text: "&#8630",
					href: ""
				}
			]
		});

		signupSinglePage.render();
		this.el.appendChild(signupSinglePage.el);

		this.signupForm = new Form(
			{
				fields: [
					{
						label: "Введите Email:",
						attributes: {
							placeholder: "qwerty@mail.ru",
							type: "text",
							id: "js-signup-email",
							type_attr: "email"
						}
					},
					{
						label: "Введите Nickname:",
						attributes: {
							placeholder: "super_pizza",
							type: "text",
							id: "js-signup-nickname",
							type_attr: "login"
						}
					},
					{
						label: "Пароль:",
						attributes: {
							placeholder: "",
							type: "password",
							id: "js-signup-password",
							type_attr: "password"
						}
					},
					{
						label: "Повторите пароль:",
						attributes: {
							placeholder: "",
							type: "password",
							id: "js-signup-passwordrep",
							type_attr: "passwordrep"
						}
					}
				],
				control: {
					text: "Зарегистрироваться!",
					id: "js-signup-submit"
				}
			}
		);

		this.signupForm.render();

		signupSinglePage.el.appendChild(this.signupForm.el);

		this.signupForm.el.addEventListener("submit", async event => {
			event.preventDefault();
			if (this.signupForm.isValid()) {
				const resp = await http.post("register/", this.signupForm.getValues());
				if (resp.status === 200) {
					document.dispatchEvent(new CustomEvent("redirect", {detail: ""}));
				}
				else {
					const error = await resp.json();
					switch (error.code) {
						case "exists":
							this.signupForm.showErrorByType("login", "Nickname уже занят");
							break;
						case "log_out":
							break;
					}
				}
			}
		});
	}

	update() {
		this.signupForm.reset();
	}
}
