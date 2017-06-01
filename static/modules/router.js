"use strict";
const [location] = [window.location];

export default class Router {
	constructor() {
		this.routes = new Map();
		this.counter = 0;

		window.addEventListener("popstate", event => {
			event.preventDefault();
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

	register(route, view, pushState = true) {
		this.routes.set(route, {source: view, id: this.counter, pushState: pushState});
		this.counter++;
	}

	start() {
		document.addEventListener("click", event => {
			if (event.target.tagName !== "A") {
				return;
			}
			event.preventDefault();

			this.go(event.target.getAttribute("href"));
		});

		//this.current = this.getViewByRoute(location.pathname);
	}

	go(path, popState = false, start = false) {
		const view = this.getViewByRoute(path);

		if (!view) {
			return;
		}

		if (this.current && this.current !== view) {
			this.current.source.hide();
		}

		if (path === "") {
			path = "/";
		}

		if (!popState && view.pushState) {
			if (start) {
				window.history.replaceState({id: view.id}, 'Page', path);
			}
			else {
				window.history.pushState({id: view.id}, 'Page', path);
			}
		}

		this.current = view;
		view.source.show();


	}
}
