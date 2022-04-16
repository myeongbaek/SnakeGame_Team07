import { GenerateFruitPosition } from "./utils.js";

export default class Game {
  $target;
  $canvas;
  $canvasContext;

  intervalId;
  isPaused = false;
  isKeyPressed = false;
  renderMain;

  state = {

    playerPos: {
      x: 20,
      y: 20,
    },
    score: 0,
    gridSize: 15,
    tileCount: 40,
    trail: [],
    tail: 5,
    velocity: {
      x: 0,
      y: -1,
    },
    fruitPos: { x: 5, y: 5 },
  };

  constructor({ $target, renderMain }) {
    this.$target = $target;
    this.renderMain = renderMain;
  }

  setState(nextState) {
    this.state = {
      ...this.state,
      ...nextState,
    };
  }
  setUp() {
    this.$target.innerHTML = `
        <canvas id="canvas" width="600" height="600"></canvas>
    `;
    this.$canvas = document.getElementById("canvas");
    this.$canvasContext = this.$canvas.getContext("2d");
    addEventListener("keydown", (event) => this.keyPress(event));
  }

  keyPress(event) {
    if (this.isKeyPressed || this.isPaused) return;
    switch (event.key) {
      case "ArrowUp":
        this.state.velocity.y !== 1
          ? this.setState({ velocity: { x: 0, y: -1 } })
          : null;
        this.isKeyPressed = true;
        break;
      case "ArrowDown":
        this.state.velocity.y !== -1
          ? this.setState({ velocity: { x: 0, y: 1 } })
          : null;
        this.isKeyPressed = true;
        break;
      case "ArrowLeft":
        this.state.velocity.x !== 1
          ? this.setState({ velocity: { x: -1, y: 0 } })
          : null;
        this.isKeyPressed = true;
        break;
      case "ArrowRight":
        this.state.velocity.x !== -1
          ? this.setState({ velocity: { x: 1, y: 0 } })
          : null;
        this.isKeyPressed = true;
        break;
      case "Escape":
        clearInterval(this.intervalId);
        this.pause();
        break;
    }
  }

  pause() {
    this.isPaused = true;

    const overlay = document.createElement("div");
    overlay.classList = "overlay";

    const modal = document.createElement("div");
    modal.classList = "modal";

    modal.innerHTML = `
        <h1>Pause</h1>
        <span class="btn resume">Resume</span>
        <span class="btn restart">Restart</span>
        <span class="btn save">Save</span>
        <span class="btn exit">Exit</span>
      `;

    overlay.appendChild(modal);
    this.$target.appendChild(overlay);

    const resume = this.$target.querySelector(".resume");
    resume.addEventListener("click", () => {
      this.isPaused = false;
      this.$target.removeChild(overlay);
      this.gameLoop();
    });

    const restart = this.$target.querySelector(".restart");
    restart.addEventListener("click", () => {
      this.isPaused = false;
      this.$target.removeChild(overlay);
      this.setState({
        ...this.state,
        score: 0,
        playerPos: { x: 20, y: 20 },
        fruitPos: GenerateFruitPosition([], this.state.tileCount),
        velocity: { x: 0, y: -1 },
        trail: [],
        tail: 5,
      });
      this.gameLoop();
    });

    /*
      need to implement saving feature with localStorage
      according to the assignment guide, we should save data then go back to main screen
    */

    /*
      Exit should bring the player back to main screen
    */
    const save = this.$target.querySelector(".save");
    save.addEventListener("click", () => {
      this.isPaused = false;
      this.$target.removeChild(overlay);
      clearInterval(this.intervalId);
      localStorage.setItem("state", JSON.stringify(this.state));
      this.setState({
        ...this.state,
        score: 0,
        playerPos: { x: 20, y: 20 },
        fruitPos: GenerateFruitPosition([], this.state.tileCount),
        velocity: { x: 0, y: -1 },
        trail: [],
        tail: 5,
      });

      clearInterval(this.intervalId);
      this.renderMain();
    });






    const exit = this.$target.querySelector(".exit");
    exit.addEventListener("click", () => {
      this.isPaused = false;
      this.setState({
        playerPos: {
          x: 20,
          y: 20,
        },
        score: 0,
        gridSize: 15,
        tileCount: 40,
        trail: [],
        tail: 5,
        velocity: {
          x: 0,
          y: -1,
        },
        fruitPos: GenerateFruitPosition([], this.state.tileCount),
      });
      clearInterval(this.intervalId);
      this.renderMain();
    });


  }

  move() {
    this.setState({
      ...this.state,
      playerPos: {
        x: this.state.playerPos.x + this.state.velocity.x,
        y: this.state.playerPos.y + this.state.velocity.y,
      },
    });
  }

  isGameOver() {
    // out of bound check

    if (
      this.state.playerPos.x < 0 ||
      this.state.playerPos.x > this.state.tileCount - 1 ||
      this.state.playerPos.y < 0 ||
      this.state.playerPos.y > this.state.tileCount - 1
    ) {
      return true;
    }


    for (var i = 0; i < this.state.trail.length - 1; i++) {
      if (
        this.state.playerPos.x === this.state.trail[i].x &&
        this.state.playerPos.y === this.state.trail[i].y
      ) {
        return true;
      }
    }

    return false;
  }

  updateFruit() {
    this.setState({
      fruitPos: GenerateFruitPosition(this.state.trail, this.state.tileCount),
    });
  }

  render() {
    this.move();
    this.isKeyPressed = false;


    if (this.isGameOver()) {
      /*
        when the game is over,
        instead of just going back to main screen,
        we should display a modal screen and
        show how much score did the player get,
        then save the data to localStorage for 'ranking' in the main screen
      */

      const overlay = document.createElement("div");
      overlay.classList = "overlay";

      const modal = document.createElement("div");
      modal.classList = "modal";

      modal.innerHTML = `
            <h1>You died</h1>
            <span class="score">Score : ${this.state.score}</span>
            <form>
            <input type="text" id="UserName" placeholder="username"></input>
            <button>-></button>
            </form>
            
            <span class="btn restart">Restart</span>
            <span class="btn exit">Exit</span>
          `;

      overlay.appendChild(modal);
      this.$target.appendChild(overlay);

      const isBntOnClick = (event) => {
        event.preventDefault();
        const rankData = { username: username.value, score: this.state.score };

        localStorage.setItem("rankData", JSON.stringify(rankData));
        console.log(localStorage.getItem("rankData"));
      }
      const username = document.getElementById("UserName")
      const userform = document.querySelector("form");
      userform.addEventListener("submit", isBntOnClick);


      //username.value;

      this.setState({
        playerPos: {
          x: 20,
          y: 20,
        },
        score: 0,
        gridSize: 15,
        tileCount: 40,
        trail: [],
        tail: 5,
        velocity: {
          x: 0,
          y: -1,
        },
        fruitPos: GenerateFruitPosition([], this.state.tileCount),
      });
      clearInterval(this.intervalId);
      //return this.renderMain();
    }

    this.$canvasContext.fillStyle = "black";
    this.$canvasContext.fillRect(0, 0, this.$canvas.width, this.$canvas.height);

    this.state.trail.push({
      x: this.state.playerPos.x,
      y: this.state.playerPos.y,
    });

    while (this.state.trail.length > this.state.tail) this.state.trail.shift();

    this.$canvasContext.fillStyle = "lime";
    this.state.trail.forEach((body) => {
      this.$canvasContext.fillRect(
        body.x * this.state.gridSize,
        body.y * this.state.gridSize,
        this.state.gridSize - 2,
        this.state.gridSize - 2
      );
    });

    if (
      this.state.playerPos.x === this.state.fruitPos.x &&
      this.state.playerPos.y === this.state.fruitPos.y
    ) {
      this.updateFruit();
      this.state.tail++;
      this.state.score++;

    }
    localStorage.setItem("score", this.state.score)

    this.$canvasContext.fillStyle = "red";
    this.$canvasContext.fillRect(
      this.state.fruitPos.x * this.state.gridSize,
      this.state.fruitPos.y * this.state.gridSize,
      this.state.gridSize - 2,
      this.state.gridSize - 2
    );
  }

  gameLoop() {
    this.intervalId = setInterval(() => {
      this.render();
    }, 1000 / 15);
  }
}
