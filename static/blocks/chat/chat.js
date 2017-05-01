"use strict";

import "./chat.scss";


const [CustomEvent] = [window.CustomEvent];

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
		this.input.setAttribute("autofocus", "");
		this.el.appendChild(this.input);

		this.submit = document.createElement("button");
		this.submit.classList.add("chat__submit");
		this.submit.textContent = "￫";
		this.el.appendChild(this.submit);

		this.submit.addEventListener("click", () => {
			this.el.dispatchEvent(new CustomEvent("submit", {"detail": this.input.value}));
		});
		document.addEventListener("keyup", event => {
			event = event || window.event;
			if (event.keyCode === 13) {
				this.el.dispatchEvent(new CustomEvent("submit", {"detail": this.input.value}));
			}
		});

		this.input.addEventListener("input", event => {
			this.input.classList.remove("chat__input_incorrect");
		});

		return this;
	}

	addUser(name, color) {
		const newUser = document.createElement("div");
		newUser.classList.add("chat__player");
		newUser.textContent = name;
		newUser.style.backgroundColor = color;
		this.players.appendChild(newUser);

		this.list.style.height = `${this.el.offsetHeight - this.players.offsetHeight - 60}px`;
	}

	addMessage(author, text, color) {
		const newMessage = document.createElement("div");
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

	reset() {
		this.list.innerHTML = "";
	}

	fail() {
		this.input.classList.add("chat__input_incorrect");
	}
}
