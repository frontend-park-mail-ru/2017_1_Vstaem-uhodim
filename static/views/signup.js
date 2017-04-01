"use strict";

import BaseView from "./base.js";
import Page from "../blocks/page/page.js";
import Form from "../blocks/form/form.js";
import HTTP from "../modules/http.js";
const CustomEvent = window.CustomEvent;

export default class SignupView extends BaseView {

	update() {
		this.form.reset();
	}

	render() {
		let http = new HTTP();

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

		const signupForm = new Form(
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

		signupForm.render();

		this.form = signupForm;

		signupSinglePage.el.appendChild(signupForm.el);


		signupForm.el.addEventListener("submit", (event) => {
			event.preventDefault();
			if (signupForm.isValid()) {
				http.post("register/", signupForm.getValues())
					.then(resp => {
						if (resp.status === 200) {
							resp.json()
								.then(() => {
									document.dispatchEvent(new CustomEvent("redirect", {detail: ""}));
								});
						}
						else {
							return resp.json()
								.then(error => {
									switch (error.code) {
										case "exists":
											signupForm.showErrorByType("login", "Nickname уже занят");
											break;
										case "log_out":
											break;
									}
								});
						}
					});
			}
		});

		this.rendered = true;
	}
}
