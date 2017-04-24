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

const router = new Router();

/*-----------------------Index----------------------------*/

const indexView = new IndexView(index);
router.register("", indexView);
router.register("/", indexView);

/*-----------------------Signup----------------------------*/

const signupView = new SignupView(signup);
router.register("/signup", signupView);

/*-----------------------Login----------------------------*/

const loginView = new LoginView(login);
router.register("/login", loginView);

/*-----------------------Leaderboard----------------------------*/

const leaderboardView = new LeaderboardView(leaderboard);
router.register("/leaderboard", leaderboardView);


/*-----------------------About----------------------------*/

const aboutView = new AboutView(about);
router.register("/about", aboutView);

/*-----------------------Game----------------------------*/

const gameView = new GameView(game);
router.register("/game", gameView);


const logoutView = new LogoutView();
router.register("/logout", logoutView, false);

router.start();

document.addEventListener("redirect", event => {
	router.go(event.detail, true);
});

const [location] = [window.location];
router.go(location.pathname, false, true);


/*
navigator.serviceWorker.register("/service_worker.js", { scope: "/" })
	.then((registration) => {
		console.log('ServiceWorker registration', registration);
	})
	.catch((error) => {
		throw new Error('ServiceWorker error: ' + error);
	});
*/
