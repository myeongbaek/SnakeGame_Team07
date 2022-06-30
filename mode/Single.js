import { CompareRank, GenerateFruitPosition } from "./utils.js";

export default class Single {
  $target;
  $canvas;
  $canvasContext;

  intervalId;
  isPaused = false;
  isKeyPressed = false;
  onGameState = false;
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
    if (this.isKeyPressed || this.isPaused || !this.onGameState) return;
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
        if (this.onGameState) {
          clearInterval(this.intervalId);
          this.pause();
        }
        break;
    }
  }

  pause() {
    this.isPaused = true;
    this.onGameState = false;

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

    //self-eating check
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

  isBlank(str) {
    return (!str || /^\s*$/.test(str));
  }

  render() {
    this.move();
    this.isKeyPressed = false;

    if (this.isGameOver()) {
      this.onGameState = false;
      localStorage.removeItem("state");

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
            
            <span class="btn exit">Exit</span>
          `;

      overlay.appendChild(modal);
      this.$target.appendChild(overlay);

      const isBntOnClick = (event) => {
        event.preventDefault();
        let rankData = { username: username.value, score: this.state.score };
        let savedData = JSON.parse(localStorage.getItem("rankData"));
        let saveNumber = localStorage.getItem("numberPlayer");
        savedData === null ? (savedData = []) : savedData;
        if (this.isBlank(username.value)) {
          let tmp = parseInt(saveNumber);
          if (saveNumber == null) {
            tmp = 1
          } else {
            tmp += 1
          }
          console.log(tmp)
          const player_default = "Player " + tmp.toString();
          rankData = { username: player_default, score: this.state.score };
          localStorage.setItem("numberPlayer", tmp.toString());
        }
        savedData.push(rankData);
        savedData.sort(CompareRank);
        if (savedData.length > 10) {
          savedData.pop();
        }
        localStorage.setItem("rankData", JSON.stringify(savedData));
        // only 1~10 scores are saved to local storage

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
        return this.renderMain();
      };
      const username = document.getElementById("UserName");
      const userform = document.querySelector("form");
      userform.addEventListener("submit", (event) => isBntOnClick(event));

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
      this.isKeyPressed = false;
      clearInterval(this.intervalId);
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
    localStorage.setItem("score", this.state.score);

    // Displaying Score
    this.$canvasContext.font = "15pt Calibri";
    this.$canvasContext.lineWidth = 3;
    this.$canvasContext.fillStyle = "grey";
    this.$canvasContext.fillText(
      "Score:" + localStorage.getItem("score"),
      10,
      580
    );

    this.$canvasContext.fillStyle = "red";
    this.$canvasContext.fillRect(
      this.state.fruitPos.x * this.state.gridSize,
      this.state.fruitPos.y * this.state.gridSize,
      this.state.gridSize - 2,
      this.state.gridSize - 2
    );
  }

  gameLoop() {
    this.onGameState = true;

    this.intervalId = setInterval(() => {
      this.render();
    }, 1000 / 15);
  }
}