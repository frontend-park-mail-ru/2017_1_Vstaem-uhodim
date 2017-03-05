(function () {
  "use strict";
  const tmpl = score_table_tmpl;
  class ScoreTable {
    constructor(players) {
      this.players = players;
      this.el = document.createElement("table");
    }
    setRating() {
      this.el.innerHTML = tmpl({
        players: this.players
      });
    }
    render() {
      this.setRating();
      this.el.classList.add("score-table");
      return this;
    }
  }
  window.ScoreTable = ScoreTable;
})();
