import Auto from "./mode/Auto.js";
import Dual from "./mode/Dual.js";
import Single from "./mode/Single.js";

export default class MainScreen {
  $target;
  $screen;
  game;
  autoPlay;
  dual;
  constructor({ $target }) {
    this.$target = $target;

    this.$screen = document.createElement("div");
    this.$screen.classList = "box";
    this.game = new Single({ $target, renderMain: this.render })
    this.dual = new Dual({ $target, renderMain: this.render })
    this.autoPlay = new Auto({ $target, renderMain: this.render });

    this.render();
  }

  render = () => {
    this.$screen.innerHTML = `
        <h1>Snake Game</h1>
        <span class="start btn single">Start</span>
        <span class="start btn dual">Dual Mode</span>
        <span class="auto btn">Auto Play</span>
        <span class="load btn">Load</span>
        <span class="rank btn">Ranking</span>
        <span class="btn" onclick="window.open('', '_self', ''); window.close();">Exit</span>
    `;
    this.$target.innerHTML = ``;
    this.$target.appendChild(this.$screen);

    //Start
    const onStartClick = () => {
      this.game.setUp();
      this.game.gameLoop();
    };
    const startBtn = this.$screen.querySelector(".start");
    startBtn.addEventListener("click", onStartClick);

    //AutoMode
    const onAutoModeClick = () => {
      this.autoPlay.setUp();
      this.autoPlay.gameLoop();
    };
    const automodeBtn = this.$screen.querySelector(".auto");
    automodeBtn.addEventListener("click", onAutoModeClick);
    //Dual
    const onDualClick = () => {
      this.dual.setUp();
      this.dual.gameLoop();
    };
    const dualBtn = this.$screen.querySelector(".dual");
    dualBtn.addEventListener("click", onDualClick);

    //Load
    const onLoadClick = () => {
      if (localStorage.getItem("state") === null) {
        console.log("no saving state data in local storage");
      } else {
        this.game.state = JSON.parse(localStorage.getItem("state"));

        this.game.setUp();
        this.game.gameLoop();
      }

      /*
        load the saved data, then start the game
        google about "localStorage" in JavaScript
      */
    };
    const loadBtn = this.$screen.querySelector(".load");
    loadBtn.addEventListener("click", onLoadClick);

    //Rank
    const rankingBtn = this.$screen.querySelector(".rank");
    rankingBtn.addEventListener("click", () => onRankClick());

    const onRankClick = () => {
      let rankarr = JSON.parse(localStorage.getItem("rankData"));
      this.$target.innerHTML = ``;
      this.$target.appendChild(this.$screen);

      this.$screen.innerHTML = `
        <h1>Top 10 Rank</h1>
        <div class="rank-container">
          ${rankarr !== null
          ? rankarr
            .map((rank, index) => {
              return `
              <div class="rank-data">
              <span class="rank-data__index">${index + 1}.</span>
              <span class="rank-data__name">${rank.username}</span>
              <span class="rank-data__score">${rank.score} point${rank.score > 1 ? 's' : ''}</span>
              </div>
              `;
            })
            .join("")
          : `<span>No Data</span>`
        }
            </div>
          <span class="menu btn">Exit</span>
      `;
      const menuBtn = this.$screen.querySelector(".menu");
      menuBtn.addEventListener("click", () => onMenuClick());
    };

    const onMenuClick = () => {
      return this.render();
    };
  };
}
