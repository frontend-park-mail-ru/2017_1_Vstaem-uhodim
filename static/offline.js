import OfflineView from "./views/offline";

const offline = document.getElementById("js-offline");

const offlineView = new OfflineView(offline);
offlineView.show();
