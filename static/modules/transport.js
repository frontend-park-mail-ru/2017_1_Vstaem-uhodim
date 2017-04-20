"use strict";
import Mediator from "./mediator.js";

export default class Transport {
	constructor() {
		if (Transport.__instance) {
			return Transport.__instance;
		}
		Mediator.__instance = this;

		this.mediator = new Mediator;

		let url = "https://croco2017.herokuapp.com/";

		this.ws = new WebSocket(url);
		this.ws.onopen = (event) => {
			this.ws.onmessage = this.handleMessage.bind(this);

			this.interval = setInterval(() => this.ws.send('u'), 10 * 1000);

			this.ws.onclose = function () {
				clearInterval(this.interval);
			};
		}
	}

	hangleMessage(event) {
		const message = JSON.parse(event.data);
		this.mediator.publish(message.type, message.payload);
	}

	send(type, payload) {
		this.ws.send(JSON.stringify({type, payload}));
	}
}
