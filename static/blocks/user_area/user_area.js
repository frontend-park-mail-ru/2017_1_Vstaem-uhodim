/* globals template */

(function () {
  "use strict";
  const tmpl = template;
  const Event = window.Event;

  class UserArea {
    constructor(options) {
      this.type = options.type;
      this.nickname = options.nickname;
      this.score = options.score;
      this.el = document.createElement("div");
    }
    setContent() {
      let user_area = this.el;
      if (this.type === "authorized") {
        this.el.innerHTML = tmpl({authorized: true, nickname: this.nickname, score: this.score});
        this.el.id = "js-index-userareaLogin";

        this.el.querySelector("#js-index-logout").addEventListener("click", function(event) {
          event.preventDefault();
          user_area.dispatchEvent(new Event("logout"));
        });
      }
      if (this.type === "notAuthorized") {

        this.el.innerHTML = tmpl({authorized: false});
        this.el.id = "js-index-userareaLogout";

        this.el.querySelector("#js-index-signup").addEventListener("click", function(event) {
          event.preventDefault();
          user_area.dispatchEvent(new Event("signup"));
        });

        this.el.querySelector("#js-index-login").addEventListener("click", function(event) {
          event.preventDefault();
          user_area.dispatchEvent(new Event("login"));
        });
      }
    }
    update(options) {
      this.type = options.type;
      this.nickname = options.nickname;
      this.score = options.score;
      this.render();
    }

    render() {
      this.setContent();

      this.el.classList.add("user-area");
    }
  }


  window.UserArea = UserArea;
})();
