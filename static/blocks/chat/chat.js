"use strict";

import "./chat.css";

export default class Chat {
	constructor() {
		this.el = document.createElement("div");
	}

	render() {
		this.el.classList.add("chat");

		this.players = document.createElement("div");
		this.players.classList.add("chat__players");
		this.el.appendChild(this.players);

		this.list = document.createElement("div");
		this.list.classList.add("chat__list");
		this.el.appendChild(this.list);

		this.input = document.createElement("input");
		this.input.classList.add("chat__input");
		this.el.appendChild(this.input);

		this.submit = document.createElement("button");
		this.submit.classList.add("chat__submit");
		this.submit.textContent = "￫";
		this.el.appendChild(this.submit);
		this.submit.addEventListener("click", event => {
			this.el.dispatchEvent(new Event("submit"));
		});
		document.addEventListener("keyup", event => {
			event = event || window.event;
			if (event.keyCode === 13) {
				this.el.dispatchEvent(new Event("submit"));
			}
		});

		return this;
	}

	addUser(name, color) {
		let newUser = document.createElement("div");
		newUser.classList.add("chat__player");
		newUser.textContent = name;
		newUser.style.backgroundColor = color;
		this.players.appendChild(newUser);

		this.list.style.height = `${this.el.offsetHeight - this.players.offsetHeight - 60}px`;
	}

	addMessage(author, text, color) {
		let newMessage = document.createElement("div");
		newMessage.classList.add("chat__message");
		newMessage.style.color = color;
		newMessage.textContent = `${author}: ${text}`;
		this.list.appendChild(newMessage);
	}

	getMessage() {
		return this.input.value;
	}

	resetMessage() {
		this.input.value = "";
	}
}
