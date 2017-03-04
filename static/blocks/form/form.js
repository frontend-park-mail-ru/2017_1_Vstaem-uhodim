/**
 * Created by kate on 04.03.17.
 */

(function() {
  "use strict";

  let Button = window.Button;

  class Form {
    constructor (options) {
      this.fields = options.fields || [];
      this.control = options.control || [];
      this.el = document.createElement("form");
    }
    getRenderedFields(fields) {
      return fields.reduce(function(sum, current) {
        return sum += `
          <p class=\"form__field\">
            <span class=\"form__label\">${current.label}</span>
            <input class=\"form__input form__input_valid\" type="${current.type}" 
            placeholder="${current.placeholder}" id="${current.id}">
          </p>
          `;
      }, "")
    }
    getRenderedControl(control) {
      return new Button({
        text: control.text,
        attrs: {
          class: "button_size_big button_type_submit",
          id: "js-signup-submit",
          type: "submit"
        }
      }).render().toString() ;
    }
    render() {
      this.el.innerHTML = `${this.getRenderedFields(this.fields)}${this.getRenderedControl(this.control)}`;
      this.el.classList.add("form");
      return this;
    }
    toString() {
      return this.el.outerHTML;
    }
  }

  window.Form = Form;

})();
