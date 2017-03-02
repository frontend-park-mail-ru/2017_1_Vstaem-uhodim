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

const userAreaLogout = document.getElementById("js-index-userareaLogout");
const userAreaLogin = document.getElementById("js-index-userareaLogin");
const userNickname = document.getElementById("js-index-nickname");
const userRating = document.getElementById("js-index-rating");
const logout = document.getElementById("js-index-logout");
const notification = document.getElementById("js-index-notification");

let inputList = new Array;
let hasEmptyPassword;
let hasError;

function makeRequest(reqUrl, reqMethod, data) {
  const baseURL = "https://croco2017.herokuapp.com/";
  let xhr = new XMLHttpRequest();
  xhr.open(reqMethod, `${baseURL}${reqUrl}`, false);
  xhr.withCredentials = true;
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(data);
  console.log(xhr.status);
  return xhr;
}

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

  let testRating = 0;


  if (!hasEmptyPassword && !isEmpty(loginNickname)) {

    let loginReq =  makeRequest("login/", "POST", JSON.stringify({login:`${loginNickname.value}`, password:`${loginPassword.value}`}));

    if (loginReq.status == 403) {
      showError(loginNickname, "");
      showError(loginPassword, "Неправильно!");
      hasError = true;
    }
  }
  if(!hasError) {
    userAreaLogout.style.display = "none";
    userNickname.innerHTML = loginNickname.value;
    userRating.innerHTML = testRating;
    userAreaLogin.style.display = "block";

    loginSinglePage.style.display = "none";
    indexLeftPage.style.display = "block";
    indexRightPage.style.display = "block";
  }
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
  if(!hasError) {

    let registerReq = makeRequest("register/", "POST", JSON.stringify({login:`${signupNickname.value}`, password:`${signupPassword.value}`, email:`${signupEmail.value}`}));

    if(registerReq.status == 409) {
      showError(signupNickname, "Nickname уже занят");
    }


    else {

      let whoAmIReq = makeRequest("who-am-i/", "GET", "");

      notification.style.display = "block";
      userAreaLogout.style.display = "none";
      userNickname.innerHTML = JSON.parse(whoAmIReq.responseText).login;
      userRating.innerHTML = "0";
      userAreaLogin.style.display = "block";

      indexLeftPage.insertBefore(notification, userAreaLogout);
      signupSinglePage.style.display = "none";
      indexLeftPage.style.display = "block";
      indexRightPage.style.display = "block";
    }
  }
  else {
    showError(signupPassword, "");
    showError(signupPasswordRep, "");
  }
});

logout.addEventListener("click",function(event) {

  let registerReq = makeRequest("logout/", "POST", "");


  userAreaLogin.style.display = "none";
  userNickname.innerHTML = "";
  userRating.innerHTML = "";
  userAreaLogout.style.display = "block";
});

window.addEventListener("click", function () {
  notification.style.display = "none";
});
