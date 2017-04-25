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

		const url = "ws://localhost:9000";

		this.ws = new WebSocket(url);
		this.ws.onopen = (event) => {
			this.connected = true;
			this.ws.onmessage = this.handleMessage.bind(this);

			this.interval = setInterval(() => this.ws.send(JSON.stringify({type: 0, content: "update"})), 10 * 1000);

			this.ws.onclose = function () {
				clearInterval(this.interval);
			};
		}
	}

	handleMessage(event) {
		const message = JSON.parse(event.data);
		this.mediator.publish(message.type, message.content);
	}

	async send(type, payload = null) {
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
			this.ws.send(JSON.stringify({type: type, content: payload}));
		}
	}
}
