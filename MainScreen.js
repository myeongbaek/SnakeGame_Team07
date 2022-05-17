import Game from "./Game.js";
import Auto from "./Auto.js";
export default class MainScreen {
  $target;
  $screen;
  game;
  auto;
  constructor({ $target }) {
    this.$target = $target;

    this.$screen = document.createElement("div");
    this.$screen.classList = "box";
    this.game = new Game({ $target, renderMain: this.render });
    this.auto = new Auto({$target, renderMain: this.render });
    this.render();
  }

  render = () => {
    this.$screen.innerHTML = `
        <h1>Snake Game</h1>
        <span class="single play btn">Single play</span>
        <span class="dual play btn">Dual play</span>
        <span class="auto play btn">Auto play</span>
        <span class="load btn">Load</span>
        <span class="rank btn">Ranking</span>
        <span class="btn">Exit</span>
    `;
    this.$target.innerHTML = ``;
    this.$target.appendChild(this.$screen);

    //Single play
    const onSinglePlayBtnClick = () => {
      this.game.setUp();
      this.game.gameLoop();
    };
    const singlePlayBtn = this.$screen.querySelector(".single");
    singlePlayBtn.addEventListener("click", onSinglePlayBtnClick);

    //Dual play
    const onDualPlayBtnClick = () => {
      this.game.setUp();
      this.game.gameLoop();
    };
    const dualPlayBtn = this.$screen.querySelector(".dual");
    dualPlayBtn.addEventListener("click", onDualPlayBtnClick);

//Auto play
    const onAutoPlayBtnClick = () => {
      this.auto.setUp();
      this.auto.gameLoop();
    };
    const autoPlayBtn = this.$screen.querySelector(".auto");
    autoPlayBtn.addEventListener("click", onAutoPlayBtnClick);

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
              <span class="rank-data__score">${rank.score}점</span>
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
