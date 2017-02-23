/**
 * Created by kate on 23.02.17.
 */

var inputList = new Array;

const nickname = document.getElementById("nickname-input");
inputList.push(nickname);
const password = document.getElementById("password-input");
inputList.push(password);
const submit = document.querySelector('input[type=submit]');
const email = document.getElementById("email-input");
if (email != undefined) inputList.push(email);
const passwordRep = document.getElementById("password-rep-input");
if (passwordRep != undefined) inputList.push(passwordRep);

let hasEmptyPassword;
let hasError;


function showError(input, errorMessage) {
  const error = document.createElement("span");
  if (errorMessage != "") {
    error.textContent = `✗ ${errorMessage}`;
    error.className = "form__error";
    input.parentNode.appendChild(error);
  }
  input.value = "";
  input.className = input.className.replace("form__input_valid", "form__input_invalid");
}

function resetError(input) {
  input.className = input.className.replace("form__input_invalid", "form__input_valid");
  let error = input.parentNode.getElementsByClassName("form__error");
  if (error.length > 0) {
    input.parentNode.removeChild(error[0]);
  }
}

function isEmpty(input) {
  return (input.value == "");
}

function validateSignupForm() {
  const r = /\S+@\S+\.\S+/;
  if (!isEmpty(email) && !r.test(email.value)) {
    showError(email, "Невалидный email");
    hasError = true;
  }

  if (!isEmpty(password) && password.value.length <= 5) {
    showError(password, "Пароль должен содержать более 5 символов");
    showError(passwordRep, "");
    return false;
  }

  if (!hasEmptyPassword && password.value != passwordRep.value) {
    showError(password, "");
    showError(passwordRep, "Пароли не совпадают!");
    hasError = true;
  }
  return !hasError;
}

function validateLoginForm() {
  if (!hasEmptyPassword && !isEmpty(nickname)) {
    // example
    // nickname: test
    // password: 123456
    if (nickname.value != "test" || password.value != "123456") {
      showError(nickname, "");
      showError(password, "Неправильно!");
      hasError = true;
    }
  }
  return !hasError;
}

submit.addEventListener("click", function (event) {
  let result;
  event.preventDefault();

  hasEmptyPassword = false;
  hasError = false;

  inputList.forEach((item) => {resetError(item);});

  inputList.forEach(function (item) {
    if (isEmpty(item)) {
      showError(item, "Поле обязательно для заполнения");
      if (item == password || item == passwordRep) hasEmptyPassword = true;
      hasError = true;
    }
  });

  if (this.id == "login-submit") result = validateLoginForm();
  if (this.id == "signup-submit") result = validateSignupForm();

  if (result == true) alert("Успешно");
  else {
    password.value = "";
    showError(password, "");
    passwordRep.value = "";
    showError(passwordRep, "");
  }
});
