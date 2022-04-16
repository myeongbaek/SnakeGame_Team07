import Game from "./Game.js";

export default class MainScreen {
  $target;
  $screen;
  game;
  constructor({ $target }) {
    this.$target = $target;

    this.$screen = document.createElement("div");
    this.$screen.classList = "box";
    this.game = new Game({ $target, renderMain: this.render });

    this.render();
  }

  render = () => {
    this.$screen.innerHTML = `
        <h1>Snake</h1>
        <span class="start btn">Start</span>
        <span class="load btn">Load</span>
        <span class="rank btn">Ranking</span>
        <span class="btn">Exit</span>
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

    //Load
    const onLoadClick = () => {
      this.game.state = JSON.parse(localStorage.getItem("state"));

      this.game.setUp();
      this.game.gameLoop();
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
          ${
            rankarr !== null
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
