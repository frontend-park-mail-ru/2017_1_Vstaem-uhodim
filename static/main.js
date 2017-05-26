"use strict";

import "whatwg-fetch";
import "./css/style.scss";
import "./css/fonts.scss";

import IndexView from "./views/index.js";
import GameView from "./views/game.js";
import AboutView from "./views/about.js";
import LeaderboardView from "./views/leaderboard.js";
import SignupView from "./views/signup.js";
import LogoutView from "./views/logout.js";
import LoginView from "./views/login.js";
import Router from "./modules/router.js";
import HTTP from "./modules/http.js";

const index = document.getElementById("js-index");
const signup = document.getElementById("js-signup");
const login = document.getElementById("js-login");
const leaderboard = document.getElementById("js-leaderboard");
const game = document.getElementById("js-game");
const about = document.getElementById("js-about");

const router = new Router();
const http = new HTTP();

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
	if(event.detail === "/logout") {
		router.go(event.detail, true);
	}
	else {
		router.go(event.detail);
	}
});

const [location] = [window.location];
router.go(location.pathname, false, true);


navigator.serviceWorker.register("/service_worker.js", { scope: "/" })
	.then((registration) => {
		//console.log('ServiceWorker registration', registration);
	})
	.catch((error) => {
		throw new Error(`ServiceWorker error: ${error}`);
	});

(async function savePictures() {
	let pictureCacheSize = 5;
	let picture;
	let size;

	if (localStorage.getItem("picturesCache") === null);

	if (localStorage.getItem("picturesCache") === null || JSON.parse(localStorage.getItem("picturesCache")).length < pictureCacheSize) {
		let pictures = [];
		if (localStorage.getItem("picturesCache") === null) {
			size = pictureCacheSize;
			localStorage.setItem("picturesCache", JSON.stringify(pictures));
		}
		else {
			size = pictureCacheSize - JSON.parse(localStorage.getItem("picturesCache")).length;
		}
		while (size > 0) {
			picture = await http.get("rand-dashes/");
			picture = await picture.json();
			//debugger;
			pictures = JSON.parse(localStorage.getItem("picturesCache"));
			pictures.push(picture);
			localStorage.setItem("picturesCache", JSON.stringify(pictures));
			size--;
		}
	}
}());




