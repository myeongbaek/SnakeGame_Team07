import {
  CompareRank,
  GenerateFruitPosition,
  GenerateFruitPositionDual,
} from "./utils.js";

export default class Dual {
  $target;
  $canvas;
  $canvasContext;

  intervalId;
  isPaused = false;
  isKeyPressed = false;
  onGameState = false;
  renderMain;

  state = {
    player1: {
      playerPos: {
        x: 0,
        y: -1,
      },
      score: 0,
      trail: [],
      tail: 5,
      velocity: {
        x: 0,
        y: 1,
      },
    },
    player2: {
      playerPos: {
        x: 39,
        y: 80,
      },
      score: 0,
      trail: [],
      tail: 5,
      velocity: {
        x: 0,
        y: -1,
      },
    },
    gridSize: 15,
    tileCount: {
      x: 80,
      y: 40,
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
        <canvas id="canvas" width="1200" height="600"></canvas>
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
        player1: {
          playerPos: {
            x: 0,
            y: -1,
          },
          velocity: {
            x: 0,
            y: 1,
          },
          score: 0,
          trail: [],
          tail: 5,
        },
        player2: {
          playerPos: {
            x: 39,
            y: 80,
          },
          velocity: {
            x: 0,
            y: -1,
          },
          score: 0,
          trail: [],
          tail: 5,
        },
        fruitPos: GenerateFruitPositionDual([], this.state.tileCount),
      });
      this.gameLoop();
    });

    const exit = this.$target.querySelector(".exit");
    exit.addEventListener("click", () => {
      this.isPaused = false;
      this.setState({
        ...this.state,
        player1: {
          playerPos: {
            x: 0,
            y: -1,
          },
          velocity: {
            x: 0,
            y: 1,
          },
          score: 0,
          trail: [],
          tail: 5,
        },
        player2: {
          playerPos: {
            x: 39,
            y: 80,
          },
          velocity: {
            x: 0,
            y: -1,
          },
          score: 0,
          trail: [],
          tail: 5,
        },
        fruitPos: GenerateFruitPositionDual([], this.state.tileCount),
      });
      clearInterval(this.intervalId);
      this.renderMain();
    });
  }

  move() {
    this.setState({
      ...this.state,
      player1: {
        playerPos: {
          x: this.state.player1.playerPos.x + this.state.player1.velocity.x,
          y: this.state.player1.playerPos.y + this.state.player1.velocity.y,
        },
      },
      player2: {
        playerPos: {
          x: this.state.player2.playerPos.x + this.state.player2.velocity.x,
          y: this.state.player2.playerPos.y + this.state.player2.velocity.y,
        },
      },
    });
  }

  isGameOver() {
    // out of bound check
    if (
      this.state.player1.playerPos.x < 0 ||
      this.state.player1.playerPos.x > this.state.tileCount.x - 1 ||
      this.state.player1.playerPos.y < 0 ||
      this.state.player1.playerPos.y > this.state.tileCount.y - 1 ||
      this.state.player2.playerPos.x < 0 ||
      this.state.player2.playerPos.x > this.state.tileCount.x - 1 ||
      this.state.player2.playerPos.y < 0 ||
      this.state.player2.playerPos.y > this.state.tileCount.y - 1
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
      fruitPos: GenerateFruitPositionDual(
        this.state.trail,
        this.state.tileCount
      ),
    });
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
        const rankData = { username: username.value, score: this.state.score };
        let savedData = JSON.parse(localStorage.getItem("rankData"));
        savedData === null ? (savedData = []) : savedData;

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
          tileCount: {
            x: 80,
            y: 40,
          },
          trail: [],
          tail: 5,
          velocity: {
            x: 0,
            y: -1,
          },
          fruitPos: GenerateFruitPositionDual([], this.state.tileCount),
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
          tileCount: {
            x: 80,
            y: 40,
          },
          trail: [],
          tail: 5,
          velocity: {
            x: 0,
            y: -1,
          },
          fruitPos: GenerateFruitPositionDual([], this.state.tileCount),
        });
        clearInterval(this.intervalId);
        this.renderMain();
      });

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
