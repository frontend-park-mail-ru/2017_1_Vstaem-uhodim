"use strict";

import "./chat.scss";
import Mediator from "../../modules/mediator.js";

const [CustomEvent] = [window.CustomEvent];

export default class Chat {
	constructor() {
		this.el = document.createElement("div");
		this.messages = new Map();
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

		window.addEventListener("resize", this.fixListSize.bind(this));
		return this;
	}

	addUser(name, color, newPlayer) {
		const newUser = document.createElement("div");
		newUser.classList.add("chat__player");
		if (name.length > 11) {
			name = `${name.slice(0, 11)}...`;
		}
		newUser.textContent = name;
		newUser.style.backgroundColor = color;
		this.players.appendChild(newUser);
		this.fixListSize();

		this.list.style.height = `${this.el.offsetHeight - this.players.offsetHeight - 60}px`;

		if (newPlayer) {
			this.addServiceMessage(`${name} зашел в игру`);
		}
	}

	deleteUser(nickname) {
		for(let player = this.players.firstChild; player !== null; player = player.nextSibling) {
			if (player.textContent === nickname) {
				this.players.removeChild(player);
				this.addServiceMessage(`${nickname} покинул игру`);
				return;
			}
		}
	}

	addMessage({author, answer, color, main, id}) {
		const newMessage = document.createElement("div");
		newMessage.classList.add("chat__message");
		newMessage.setAttribute("messId", id);
		this.messages.set(id, newMessage);
		this.list.appendChild(newMessage);
		const plus = document.createElement("span");
		plus.classList.add("chat__vote");
		plus.classList.add("chat__plus");
		plus.innerHTML = " + ";

		const minus = document.createElement("span");
		minus.classList.add("chat__vote");
		minus.classList.add("chat__minus");
		minus.innerHTML = " - ";

		function selectPlus(e) {
			if (!e.target.classList.contains("chat__plus_selected")) {
				const mediator = new Mediator();
				mediator.publish("VOTE_MESSAGE", {id: id, vote: true});
				e.target.classList.add("chat__plus_selected");
				e.target.nextSibling.classList.remove("chat__minus");
				e.target.nextSibling.classList.remove("chat__minus_selected");
			}
		}

		function selectMinus(e) {
			if (!e.target.classList.contains("chat__plus_selected")) {
				const mediator = new Mediator();
				mediator.publish("VOTE_MESSAGE", {id: id, vote: false});
				e.target.classList.add("chat__minus_selected");
				e.target.previousSibling.classList.remove("chat__plus");
				e.target.previousSibling.classList.remove("chat__plus_selected");
			}
		}

		if (main) {
			newMessage.appendChild(plus);
			newMessage.appendChild(minus);

			plus.addEventListener("click", selectPlus);
			minus.addEventListener("click", selectMinus);
		}
		else {
			plus.style.visibility = "hidden";
			newMessage.appendChild(plus);
		}

		const message = document.createElement("span");
		message.style.color = color;
		message.textContent = `${author}: ${answer}`;
		newMessage.appendChild(message);

		this.list.scrollTop = this.list.scrollHeight;
	}

	addServiceMessage(text) {
		const newMessage = document.createElement("div");
		newMessage.classList.add("chat__message");
		this.list.appendChild(newMessage);

		const info = document.createElement("span");
		info.classList.add("chat__vote");
		info.classList.add("chat__info");
		info.innerHTML = " &#8505; ";
		newMessage.appendChild(info);

		const message = document.createElement("span");
		message.textContent = text;
		newMessage.appendChild(message);
	}

	updateMessage(id, vote) {
		const message = this.messages.get(id);
		if (vote) {
			message.firstChild.innerHTML = " + ";
			message.firstChild.classList.remove("chat__minus");
			message.firstChild.classList.remove("chat__minus_selected");
			message.firstChild.classList.add("chat__plus_selected");
			message.firstChild.style.visibility = "visible";
		}
		else {
			message.firstChild.innerHTML = " - ";
			message.firstChild.classList.remove("chat__plus");
			message.firstChild.classList.remove("chat__plus_selected");
			message.firstChild.classList.add("chat__minus_selected");
			message.firstChild.style.visibility = "visible";
		}
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

	fixListSize() {
		this.list.style.height = `${this.el.clientHeight - this.players.clientHeight - 55}px`;
		this.list.style.minHeight = "0px";
	}

	fail() {
		this.input.classList.add("chat__input_incorrect");
	}
}
