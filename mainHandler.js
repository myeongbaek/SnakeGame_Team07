class MainHandler {
  constructor() {
    this.gameHandler = new GameHandler();
  }
  mainScreen() {
    const body = document.querySelector("body");
    body.innerHTML = `
        <div class="main">
            <div class="box">
                <h1>Snake</h1>
                <span class="start">Start</span>
                <span>Load</span>
                <span>Ranking</span>
                <span>Exit</span>
            </div>
        </div>
    `;
    const onStartClick = () => {
      const main = document.querySelector(".main");
      main.innerHTML = `<canvas id="canvas" width="400" height="400"></canvas>`;
      this.gameHandler.startGame();
    };
    const startBtn = body.querySelector(".start");
    startBtn.addEventListener("click", onStartClick);
  }
}
