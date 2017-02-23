/**
 * Created by kate on 23.02.17.
 */

const indexLeftPage = document.getElementById("js-index-leftpage");
const indexRightPage = document.getElementById("js-index-rightpage");
const indexSignup = document.getElementById("js-index-signup");
const indexLogin = document.getElementById("js-index-login");
const indexLeaderboard = document.getElementById("js-index-leaderboard");
const indexAbout = document.getElementById("js-index-about");
const indexGame = document.getElementById("js-index-game");

const signupSinglePage = document.getElementById("js-signup-singlepage");

const loginSinglePage = document.getElementById("js-login-singlepage");

const leaderboardLeftPage = document.getElementById("js-leaderboard-leftpage");
const leaderboardRightPage = document.getElementById("js-leaderboard-rightpage");

const aboutLeftPage = document.getElementById("js-about-leftpage");
const aboutRightPage = document.getElementById("js-about-rightpage");

const gameSinglePage = document.getElementById("js-game-singlepage");


function hideIndex() {
  indexLeftPage.style.display = "none";
  indexRightPage.style.display = "none";
}

function showIndex() {
  indexLeftPage.style.display = "block";
  indexRightPage.style.display = "block";
}

function hideLeaderboard() {
  leaderboardLeftPage.style.display = "none";
  leaderboardRightPage.style.display = "none";
}

function showLeaderboard() {
  leaderboardLeftPage.style.display = "block";
  leaderboardRightPage.style.display = "block";
}

function hideAbout() {
  aboutLeftPage.style.display = "none";
  aboutRightPage.style.display = "none";
}

function showAbout() {
  aboutLeftPage.style.display = "block";
  aboutRightPage.style.display = "block";
}


indexSignup.addEventListener("click", function(event){
  event.preventDefault();

  hideIndex();
  signupSinglePage.style.display = "block";
});

indexLogin.addEventListener("click", function(event){
  event.preventDefault();

  hideIndex();
  loginSinglePage.style.display = "block";
});

indexLeaderboard.addEventListener("click", function(event){
  event.preventDefault();

  hideIndex();
  showLeaderboard();
});

indexAbout.addEventListener("click", function(event){
  event.preventDefault();

  hideIndex();
  showAbout();
});

indexGame.addEventListener("click", function(event){
  event.preventDefault();

  hideIndex();
  gameSinglePage.style.display = "block";
});

Array.prototype.slice.call(document.getElementsByClassName("button_type_back")).forEach(function(item) {
  item.addEventListener("click", function (event) {
    event.preventDefault();

    signupSinglePage.style.display = "none";
    loginSinglePage.style.display = "none";
    hideLeaderboard();
    hideAbout();
    showIndex();
  })
});

signupSinglePage.style.display = "none";
loginSinglePage.style.display = "none";
hideLeaderboard();
hideAbout();
gameSinglePage.style.display = "none";


