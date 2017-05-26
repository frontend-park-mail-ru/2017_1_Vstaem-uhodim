"use strict";

import "./css/style.scss";
import "./css/fonts.scss";

import OfflineIndexView from "./views/offline_index.js";
import AboutView from "./views/about.js";
import LeaderboardView from "./views/leaderboard.js";
import GameView from "./views/game.js";
import Router from "./modules/router.js";
import Mediator from "./modules/mediator.js";


const index = document.getElementById("js-index");
const game = document.getElementById("js-game");
const about = document.getElementById("js-about");
const leaderboard = document.getElementById("js-leaderboard");

const router = new Router();
const mediator = new Mediator();

/*-----------------------Index----------------------------*/

const offlineIndexView = new OfflineIndexView(index);
router.register("", offlineIndexView);
router.register("/", offlineIndexView);

/*-----------------------Game----------------------------*/

const gameView = new GameView(game);
router.register("/game", gameView);
mediator.publish("SET_GAME_MODE", "offline");


/*-----------------------About----------------------------*/

const aboutView = new AboutView(about);
router.register("/about", aboutView);

router.start();

/*-----------------------Leaderboard----------------------------*/

const leaderboardView = new LeaderboardView(leaderboard);
router.register("/leaderboard", leaderboardView);

document.addEventListener("redirect", event => {
	router.go(event.detail);
});

const [location] = [window.location];
router.go(location.pathname, false, true);
