"use strict";
const location = window.location;

export default class Router {
	constructor() {
		this.routes = new Map();
		this.counter = 0;

		window.addEventListener("popstate", event => {
			event.preventDefault();
			debugger;
			this.go(this.getRouteById(event.state.id), true);
		});

	}

	getViewByRoute(route) {
		return this.routes.get(route);
	}

	getRouteById(id) {
		for (const route of this.routes.keys()) {
			if (this.routes.get(route).id === id) {
				return route;
			}
		}
	}

	register(route, view) {
		this.routes.set(route, {source: view, id: this.counter});
		this.counter++;
	}

	start() {
		document.addEventListener("click", event => {
			if (event.target.tagName != "A") {
				return;
			}
			event.preventDefault();

			this.go(event.target.getAttribute("href"));
		});


		this.current = this.getViewByRoute(location.pathname);
	}

	go(path, popState = false) {

		let view = this.getViewByRoute(path);

		if (!view) {
			return;
		}

		if (this.current && this.current !== view) {
			this.current.source.hide();
		}

		view.source.show();
		if (path === "") {
			path = "/";
		}

		if (!popState) {
			window.history.pushState({id: view.id}, 'Page', path);
		}

		this.current = view;
	}
}
