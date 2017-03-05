(function() {
  "use strict";

  let Button = window.Button;
  const tmpl = form_tmpl;

  class Form {
    constructor (options) {
      this.fields = options.fields || [];
      this.control = options.control || [];
      this.el = document.createElement("form");
    }
    getRenderedFields() {
      return tmpl({fields: this.fields});
    }
    getRenderedControl() {
      return new Button({
        text: this.control.text,
        attrs: {
          class: "button_size_big button_type_submit",
          id: this.control.id,
          type: "submit"
        }
      }).render().toString() ;
    }
    render() {
      this.el.innerHTML = `${this.getRenderedFields()}${this.getRenderedControl()}`;
      this.el.classList.add("form");
      this.el.setAttribute("action", "#");
      return this;
    }
    toString() {
      return this.el.outerHTML;
    }
  }

  window.Form = Form;

})();
