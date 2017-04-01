"use strict";

export default class Mediator {
	constructor() {
		if (Mediator.__instance) {
			return Mediator.__instance;
		}

		this.channels = [];


		Mediator.__instance = this;
	}

	subscribe(name, func) {
		if (!this.channels[name]) {
			this.channels[name] = [];
		}
		this.channels[name].push(func);
		return this;
	}

	publish(name, payload = null) {
		if (!this.channels[name]) {
			return;
		}
		this.channels[name].forEach(func => {
			func(payload);
		});
	}

	unsubscribe(name, func) {
		//
	}



}
