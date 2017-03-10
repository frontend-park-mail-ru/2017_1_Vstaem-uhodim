/* globals template */
(function() {
  "use strict";

  let Button = window.Button;
  const tmpl = template;

  class Form {
    constructor (options) {
      this.fields = options.fields || [];
      this.control = options.control || [];
      this.el = document.createElement("form");
    }
    findInputs() {
      this.inputs =  this.el.getElementsByTagName("input");
    }
    setFields() {
      return tmpl({fields: this.fields});
    }
    setControl() {
      return new Button({
        text: this.control.text,
        attrs: {
          class: "button_size_big button_type_submit",
          id: this.control.id,
          type: "submit"
        }
      }).render().toString() ;
    }
    resetError(input) {
      input.className = input.className.replace("form__input_invalid", "form__input_valid");
      let error = input.parentNode.getElementsByClassName("form__error");
      if (error.length > 0) {
        error[0].textContent = "";
      }
    }
    reset() {
      Array.prototype.slice.call(this.inputs).forEach(input => {
        this.resetError(input);
        input.value = "";
      });
    }
    showErrorByType(inputName, errorMessage) {
      Array.prototype.slice.call(this.inputs).forEach(input => {
        if (input.getAttribute("type_attr") === inputName) {
          this.showFieldError(input, errorMessage);
        }
      });
    }
    showFieldError(input, errorMessage) {
      const error = input.parentNode.getElementsByClassName("form__error")[0];
      if (errorMessage !== "") {
        error.textContent = `✗ ${errorMessage}`;
      }
      input.value = "";
      input.className = input.className.replace("form__input_valid", "form__input_invalid");
    }
    isValid() {
      let hasError = false;
      window.inputs = this.inputs;

      let password = null;
      let passwordrep = null;

      Array.prototype.slice.call(this.inputs).forEach(input => {

        this.resetError(input);
        if (input.value === "") {
          this.showFieldError(input, "Поле обязательно для заполнения");
          hasError = true;
          return;
        }
        switch (input.getAttribute("type_attr")) {
          case "email":
            const r = /\S+@\S+\.\S+/;
            if (!r.test(input.value)) {
              this.showFieldError(input, "Невалидный email");
              hasError = true;
            }
            break;
          case "password":
            password = input;
            if (input.value.length <= 5) {
              this.showFieldError(input, "Пароль должен содержать более 5 символов");
              hasError = true;
            }
            else {
              if (hasError) { this.showFieldError(input, ""); }
            }
            break;
          case "passwordrep":
            if (hasError) {
              this.showFieldError(input, "");
              break;
            }
            passwordrep = input;
            if (password !== null && input.value !== password.value) {
              this.showFieldError(input, "Пароли не совпадают");
              this.showFieldError(password, "");
            }
            break;
        }

        if (password !== null && passwordrep !== null && passwordrep.value !== password.value) {
          this.showFieldError(input, "Пароли не совпадают");
          this.showFieldError(password, "");
        }

        if (hasError) {
          return false;
        }
        else {
          return true;
        }

      });

      if (hasError) return false;
      else return true;
    }
    getValues() {
      let values = {};
      Array.prototype.slice.call(this.inputs).forEach(input => {
        switch (input.getAttribute("type_attr")) {
          case "email":
            values.email = input.value;
            break;
          case "login":
            values.login = input.value;
            break;
          case "password":
            values.password = input.value;
            break;
        }
      });
      return values;
    }
    render() {
      this.el.innerHTML = `${this.setFields()}${this.setControl()}`;
      this.el.classList.add("form");
      this.el.setAttribute("action", "#");
      this.findInputs();
      return this;
    }
    toString() {
      return this.el.outerHTML;
    }
  }

  window.Form = Form;

})();
