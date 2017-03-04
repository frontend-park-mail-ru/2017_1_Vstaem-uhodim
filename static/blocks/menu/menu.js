/**
 * Created by kate on 04.03.17.
 */

(function() {
  class Menu {
    constructor(options) {
      this.controls = options.controls;
      this.el = document.createElement("div");
    }

    setCotrols(controls) {
      this.controls.forEach(control => {
        let htmlClass = null;
        if (control.action == true) htmlClass = "menu__button_action";

        let controlEl = new Button({
          text: control.text,
          attrs: {
            class: htmlClass,
            id: control.id
          }
        });
        controlEl.render();

        controlEl.el.classList.add("button_size_big");
        controlEl.el.classList.add("menu__button");

        let menu = this.el;
        controlEl.el.addEventListener("click", function()
          {
            menu.dispatchEvent(new Event(control.event));
          });

        this.el.appendChild(controlEl.el);
      });
    }

    render() {
      this.setCotrols(this.controls);
      this.el.classList.add("menu");
      return this;
    }
  }

  window.Menu = Menu;
})();
