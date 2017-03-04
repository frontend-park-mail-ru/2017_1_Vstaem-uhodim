/**
 * Created by kate on 04.03.17.
 */

(function() {

  class Button {
    constructor (options) {
      this.text = options.text;
      this.attrs = options.attrs || {};
      this.el = document.createElement("button");
    }
    setAttrs(attrs) {
      Object.keys(attrs).forEach(name => {
        this.el.setAttribute(name, this.attrs[name]);
      })
    }
    render() {
      this.el.innerHTML = this.text;
      this.setAttrs(this.attrs);
      this.el.classList.add("button");
      return this;
    }
    toString() {
      return this.el.outerHTML;
    }
  }

  window.Button = Button;
})();
