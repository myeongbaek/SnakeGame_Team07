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
    console.log(this);
    this.$screen.innerHTML = `
        <h1>Snake</h1>
        <span class="start btn">Start</span>
        <span class="load btn">Load</span>
        <span class="rank btn">Ranking</span>
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

    /*
      here we need to make the rest of the buttons in main screen work

      line 36 to 39 is function to start the game

      line 40 grabs the start button from the page and let you work with it

      line 41 registers the game-start function to the start button
    */
    const onLoadClick = () => {

      this.game.state=JSON.parse(localStorage.getItem("state"));

      this.game.setUp();
      this.game.gameLoop();


      /*
        load the saved data, then start the game
        google about "localStorage" in JavaScript
      */
    };
    const loadBtn = this.$screen.querySelector(".load");
    loadBtn.addEventListener("click", onLoadClick);



    /*
      grab the load button, then register the function
    */

    /*
      same with the ranking

      I don't think we need to make exit feature since we're on web
    */
  };
}
