"use strict";

export default class Mediator {
	constructor() {
		if (Mediator.__instance) {
			return Mediator.__instance;
		}

		this.channels = new Map();


		Mediator.__instance = this;
	}

	subscribe(name, func) {
		if (!this.channels.get(name)) {
			this.channels.set(name, []);
		}
		this.channels.get(name).push(func);
		return this;
	}

	publish(name, payload = null) {
		if (!this.channels.get(name)) {
			return;
		}
		this.channels.get(name).forEach(func => {
			func(payload);
		});
	}

	unsubscribe(name, f) {
		if (!this.channels.get(name)) {
			return;
		}
		this.channels.get(name).splice(this.channels.get(name).indexOf(f), 1);
		return;
	}

}
