import Game from "./Game.js";

export default class MainScreen {
  $target;
  $screen;
  state;
  game;
  constructor({ $target, initialState }) {
    this.$target = $target;

    this.$screen = document.createElement("div");
    this.$screen.classList = "box";

    this.state = initialState;

    this.game = new Game({ $target });

    this.render();
  }

  setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  render = () => {
    this.$screen.innerHTML = `
        <h1>Snake</h1>
        <span class="start btn">Start</span>
        <span class="btn">Load</span>
        <span class="btn">Ranking</span>
        <span class="btn">Exit</span>
    `;
    this.$target.innerHTML = ``;
    this.$target.appendChild(this.$screen);
    const onStartClick = () => {
      this.game.setUp();
      this.game.gameLoop();
    };
    const startBtn = this.$screen.querySelector(".start");
    startBtn.addEventListener("click", onStartClick);
  };
}
