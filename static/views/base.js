export default class BaseView {
	constructor(node) {
		this.el = node;
		this.rendered = false;
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
