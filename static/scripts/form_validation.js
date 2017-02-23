/**
 * Created by kate on 23.02.17.
 */

const loginNickname = document.getElementById("js-login-nickname");
const loginPassword = document.getElementById("js-login-password");
const loginSubmit = document.getElementById("js-login-submit");

const signupEmail = document.getElementById("js-signup-email");
const signupNickname = document.getElementById("js-signup-nickname");
const signupPassword = document.getElementById("js-signup-password");
const signupPasswordRep = document.getElementById("js-signup-passwordrep");
const signupSubmit = document.getElementById("js-signup-submit");

let inputList = new Array;
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

function checkEmpty(list) {
  list.forEach(function (item) {
    if (isEmpty(item)) {
      showError(item, "Поле обязательно для заполнения");
      if (item == loginPassword || item == signupPassword || item == signupPasswordRep ) hasEmptyPassword = true;
      hasError = true;
    }
  });
}

loginSubmit.addEventListener("click", function(event) {
  event.preventDefault();

  hasEmptyPassword = false;
  hasError = false;
  inputList = [];
  inputList.push(loginNickname);
  inputList.push(loginPassword);

  inputList.forEach((item) => {resetError(item);});
  checkEmpty(inputList);

  if (!hasEmptyPassword && !isEmpty(loginNickname)) {
    // example
    // nickname: test
    // password: 123456
    if (loginNickname.value != "test" || loginPassword.value != "123456") {
      showError(loginNickname, "");
      showError(loginPassword, "Неправильно!");
      hasError = true;
    }
  }
  if(!hasError) alert("Успешно!");
  else showError(loginPassword, "");
});

signupSubmit.addEventListener("click", function(event) {
  event.preventDefault();

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

  if (!hasEmptyPassword && signupPassword.value != signupPasswordRep.value) {
    showError(signupPassword, "");
    showError(signupPasswordRep, "Пароли не совпадают!");
    hasError = true;
  }
  if(!hasError) alert("Успешно!");
  else {
    showError(signupPassword, "");
    showError(signupPasswordRep, "");
  }
});
