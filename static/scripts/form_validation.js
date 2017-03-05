const loginNickname = document.getElementById("js-login-nickname");
const loginPassword = document.getElementById("js-login-password");

const signupEmail = document.getElementById("js-signup-email");
const signupNickname = document.getElementById("js-signup-nickname");
const signupPassword = document.getElementById("js-signup-password");
const signupPasswordRep = document.getElementById("js-signup-passwordrep");

let inputList = [];
let hasEmptyPassword;
let hasError;

function showError(input, errorMessage) {
  "use strict";
  const error = document.createElement("span");
  if (errorMessage !== "") {
    error.textContent = `✗ ${errorMessage}`;
    error.className = "form__error";
    input.parentNode.appendChild(error);
  }
  input.value = "";
  input.className = input.className.replace("form__input_valid", "form__input_invalid");
}

function resetError(input) {
  "use strict";
  input.className = input.className.replace("form__input_invalid", "form__input_valid");
  let error = input.parentNode.getElementsByClassName("form__error");
  if (error.length > 0) {
    input.parentNode.removeChild(error[0]);
  }
}

function isEmpty(input) {
  "use strict";
  return (input.value === "");
}

function checkEmpty(list) {
  "use strict";
  list.forEach(function (item) {
    if (isEmpty(item)) {
      showError(item, "Поле обязательно для заполнения");
      if (item === loginPassword || item === signupPassword || item === signupPasswordRep ) {hasEmptyPassword = true;}
      hasError = true;
    }
  });
}

function validateLogin() {
  "use strict";
  hasEmptyPassword = false;
  hasError = false;
  inputList = [];
  inputList.push(loginNickname);
  inputList.push(loginPassword);

  inputList.forEach((item) => {resetError(item);});
  checkEmpty(inputList);

  // example
  // nickname: test
  // password: 123456
  let testNickname = "test";
  let testPassword = "123456";

  if (!hasEmptyPassword && !isEmpty(loginNickname)) {
    if (loginNickname.value !== testNickname || loginPassword.value !== testPassword) {
      showError(loginNickname, "");
      showError(loginPassword, "Неправильно!");
      hasError = true;
    }
  }
  if(!hasError) {
    return true;
  }
  else {
    showError(loginPassword, "");
    return false;
  }
}

function validateSignup() {
  "use strict";

  hasEmptyPassword = false;
  hasError = false;
  inputList = [];
  inputList.push(signupEmail);
  inputList.push(signupNickname);
  inputList.push(signupPassword);
  inputList.push(signupPasswordRep);

  inputList.forEach((item) => {resetError(item);});
  checkEmpty(inputList);

  const r = /\S+@\S+\.\S+/;
  if (!isEmpty(signupEmail) && !r.test(signupEmail.value)) {
    showError(signupEmail, "Невалидный email");
    hasError = true;
  }

  if (!isEmpty(signupPassword) && signupPassword.value.length <= 5) {
    showError(signupPassword, "Пароль должен содержать более 5 символов");
    showError(signupPasswordRep, "");
    return false;
  }

  if (!hasEmptyPassword && signupPassword.value !== signupPasswordRep.value) {
    showError(signupPassword, "");
    showError(signupPasswordRep, "Пароли не совпадают!");
    hasError = true;
  }
  if(!hasError) {
    return true;
  }
  else {
    showError(signupPassword, "");
    showError(signupPasswordRep, "");
    return false;
  }
}
