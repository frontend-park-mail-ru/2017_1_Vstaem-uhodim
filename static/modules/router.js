"use strict";

export default class Router {
	constructor() {
		this.routes = {};
	}

	getViewByRoute(route) {
		return this.routes[route];
	}

	register(route, view) {
		this.routes[route] = view;
	}

	start() {
		document.addEventListener("click", e => {
			if (event.target.tagName != "A") {
				return;
			}
			event.preventDefault();

			this.go(event.target.getAttribute("href"));
		});

		this.current = this.getViewByRoute(location.pathname);
	}

	go(path) {

		let view = this.getViewByRoute(path);

		if (path == "/logout") {
			view.render();
			return;
		}

		if (!view) {
			return;
		}

		if (this.current && this.current != view) {
			this.current.hide();
		}

		view.show();
		if (path == "") {
			path = "/";
		}
		window.history.pushState({ page: 0 }, 'Page 0', path);

		this.current = view;
	}

	back() {

	}

	forward() {

	}
}
