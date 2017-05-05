import OfflineView from "./views/offline";
import Mediator from "./modules/mediator.js";
import "./css/fonts.scss";
import "./css/style.scss";

const mediator = new Mediator();

const offline = document.getElementById("js-offline");

const offlineView = new OfflineView(offline);
offlineView.show();

mediator.publish("OFFLINE_PAINT");
