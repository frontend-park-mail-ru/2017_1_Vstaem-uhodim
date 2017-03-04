/**
 * Created by kate on 04.03.17.
 */

(function() {
  class Page {
    constructor(options) {
      this.type = options.type;
      this.title = options.title || "";
      this.controls = options.controls || [];
      this.el = document.createElement("div");
    }

    setTitle(title) {
      if(this.title != "") {
        let titleEl = document.createElement("div");
        titleEl.innerText = title;
        titleEl.classList.add("page__title");
        this.el.appendChild(titleEl);
      }
    }

    setType(type) {
      switch(type) {
        case "single":
        case "left":
        case "right":
          break;
        default:
          type = "single";
          break;
      }
      this.el.classList.add(`page_type_${type}`);
    }

    setControls(controls) {
      controls.forEach(control => {
        let controlEl = new Button({
          text: control.text,
          attrs: {
            class: "button_size_mini button_type_back"
          }
        });
        this.el.appendChild(controlEl.render().el);
      })
    }

    render() {
      this.setControls(this.controls);
      this.setTitle(this.title);
      this.setType(this.type);
      this.el.classList.add("page");
      return this;
    }
  }

  window.Page = Page;
})();
