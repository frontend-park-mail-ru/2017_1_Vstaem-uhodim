"use strict";
import Mediator from "./mediator.js";

export default class Transport {
	constructor() {
		if (Transport.__instance) {
			return Transport.__instance;
		}
		Transport.__instance = this;
		this.connected = false;
		this.count = 0;

		this.mediator = new Mediator;

		//this.url = "wss://localhost:8082/sp-games/";
		this.url = "wss://croco2017.herokuapp.com/sp-games/";
	}

	open() {
		this.ws = new WebSocket(this.url);
		this.ws.onopen = (event) => {
			this.connected = true;
			this.ws.onmessage = this.handleMessage.bind(this);

			this.interval = setInterval(
				(() => {
					this.send("UPDATE");
				}).bind(this), 5000);

			this.ws.onclose = function () {
				this.connected = false;
				clearInterval(this.interval);
				this.handleClosing();
			}.bind(this);
		}
	}

	handleClosing(event) {
		this.mediator.publish("CHECK_GAME");
	}

	handleMessage(event) {
		const message = JSON.parse(event.data);
		//console.log({type1: message.type, content1: message.content });
		this.mediator.publish(message.type, message.content);
	}

	async send(type, payload = {}) {
		if (!this.connected) {
			setTimeout(() => {
				if (this.count > 20) {
					return;
				}
				this.count++;
				this.send(type, payload);
			}, 1000)
		}
		else {
			//console.log({type: type, content: payload});
			this.ws.send(JSON.stringify({type: type, content: payload}));
		}
	}
	

	close() {
		this.ws.close();
	}
}
