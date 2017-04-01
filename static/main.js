"use strict";

import IndexView from "./views/index.js";
import GameView from "./views/game.js";
import AboutView from "./views/about.js";
import LeaderboardView from "./views/leaderboard.js";
import SignupView from "./views/signup.js";
import LogoutView from "./views/logout.js";
import LoginView from "./views/login.js";
import Router from "./modules/router.js";

const index = document.getElementById("js-index");
const signup = document.getElementById("js-signup");
const login = document.getElementById("js-login");
const leaderboard = document.getElementById("js-leaderboard");
const game = document.getElementById("js-game");
const about = document.getElementById("js-about");

let router = new Router();

/*-----------------------Index----------------------------*/

let indexView = new IndexView(index);
router.register("", indexView);
router.register("/", indexView);

/*-----------------------Signup----------------------------*/

let signupView = new SignupView(signup);
router.register("/signup", signupView);

/*-----------------------Login----------------------------*/

let loginView = new LoginView(login);
router.register("/login", loginView);

/*-----------------------Leaderboard----------------------------*/

let leaderboardView = new LeaderboardView(leaderboard);
router.register("/leaderboard", leaderboardView);


/*-----------------------About----------------------------*/

let aboutView = new AboutView(about);
router.register("/about", aboutView);

/*-----------------------Game----------------------------*/

let gameView = new GameView(game);
router.register("/game", gameView);


let logoutView = new LogoutView();
router.register("/logout", logoutView);


router.start();

router.go(location.pathname);

document.addEventListener("redirect", event => {
	router.go(event.detail);
});

