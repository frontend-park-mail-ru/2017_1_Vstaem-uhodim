import HTTP from "../modules/http.js";

export default class BaseView {
	constructor(node) {
		this.el = node;
		this.rendered = false;
	}

	currentUser() {
		let http = new HTTP();
		return new Promise((resolve) => {
			http.get("who-am-i/")
				.then(resp => {
					if (resp.status === 200) {
						return resp.json();
					}
					else {
						throw Error("log out");
					}
				})
				.then(user => {
					resolve({
						type: "authorized",
						nickname: user.login,
						score: user.rating
					});
				}, () => {
					resolve({
						type: "notAuthorized",
						nickname: "",
						score: ""
					});
				});
		});
	}

	show() {
		if (!this.rendered) {
			this.render();
			this.rendered = true;
		}
		else {
			this.update();
		}
		this.el.hidden = false;
	}

	hide() {
		this.el.hidden = true;
	}

	update() {

	}
}
