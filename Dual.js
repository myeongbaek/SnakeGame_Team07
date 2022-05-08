import { GenerateFruitPositionDual } from "./utils.js";

export default class Dual {
  $target;
  $canvas;
  $canvasContext;

  intervalId;
  isPaused = false;
  onGameState = false;
  renderMain;

  state = {
    player1: {
      isKeyPressed: false,
      playerPos: {
        x: 0,
        y: -1,
      },
      trail: [],
      tail: 5,
      velocity: {
        x: 0,
        y: 1,
      },
    },
    player2: {
      isKeyPressed: false,
      playerPos: {
        x: 79,
        y: 40,
      },
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
    fruits: [
      { x: 30, y: 10 },
      { x: 70, y: 30 },
    ],
  };

  constructor({ $target, renderMain }) {
    this.$target = $target;
    this.renderMain = renderMain;
    console.log(this.state.fruits);
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
    addEventListener("keydown", (event) => this.p1KeyPress(event));
    addEventListener("keydown", (event) => this.p2KeyPress(event));
    addEventListener("keydown", (event) => this.globalKeyPress(event));
  }
  globalKeyPress(event) {
    switch (event.key) {
      case "Escape":
        if (this.onGameState) {
          clearInterval(this.intervalId);
          this.pause();
        }
        break;
    }
  }
  p1KeyPress(event) {
    if (this.state.player1.isKeyPressed || this.isPaused) return;
    switch (event.key) {
      case "w":
        event.preventDefault();
        this.state.player1.velocity.y !== 1
          ? this.setState({
              player1: {
                ...this.state.player1,
                velocity: { x: 0, y: -1 },
              },
            })
          : null;
        this.state.player1.isKeyPressed = true;
        break;
      case "s":
        event.preventDefault();
        this.state.player1.velocity.y !== -1
          ? this.setState({
              player1: { ...this.state.player1, velocity: { x: 0, y: 1 } },
            })
          : null;
        this.state.player1.isKeyPressed = true;
        break;
      case "a":
        event.preventDefault();
        this.state.player1.velocity.x !== 1
          ? this.setState({
              player1: { ...this.state.player1, velocity: { x: -1, y: 0 } },
            })
          : null;
        this.state.player1.isKeyPressed = true;
        break;
      case "d":
        event.preventDefault();
        this.state.player1.velocity.x !== -1
          ? this.setState({
              player1: { ...this.state.player1, velocity: { x: 1, y: 0 } },
            })
          : null;
        this.state.player1.isKeyPressed = true;
        break;
    }
  }
  p2KeyPress(event) {
    if (this.state.player2.isKeyPressed || this.isPaused) return;
    switch (event.key) {
      case "ArrowUp":
        event.preventDefault();
        this.state.player2.velocity.y !== 1
          ? this.setState({
              player2: {
                ...this.state.player2,
                velocity: { x: 0, y: -1 },
              },
            })
          : null;
        this.state.player2.isKeyPressed = true;
        break;
      case "ArrowDown":
        event.preventDefault();
        this.state.player2.velocity.y !== -1
          ? this.setState({
              player2: { ...this.state.player2, velocity: { x: 0, y: 1 } },
            })
          : null;
        this.state.player2.isKeyPressed = true;
        break;
      case "ArrowLeft":
        event.preventDefault();
        this.state.player2.velocity.x !== 1
          ? this.setState({
              player2: { ...this.state.player2, velocity: { x: -1, y: 0 } },
            })
          : null;
        this.state.player2.isKeyPressed = true;
        break;
      case "ArrowRight":
        event.preventDefault();
        this.state.player2.velocity.x !== -1
          ? this.setState({
              player2: { ...this.state.player2, velocity: { x: 1, y: 0 } },
            })
          : null;
        this.state.player2.isKeyPressed = true;
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
          trail: [],
          tail: 5,
        },
        player2: {
          playerPos: {
            x: 79,
            y: 40,
          },
          velocity: {
            x: 0,
            y: -1,
          },
          trail: [],
          tail: 5,
        },
        fruits: [
          GenerateFruitPositionDual(
            [],
            [],
            this.state.fruits,
            this.state.tileCount
          ),
          GenerateFruitPositionDual(
            [],
            [],
            this.state.fruits,
            this.state.tileCount
          ),
        ],
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
          trail: [],
          tail: 5,
        },
        player2: {
          playerPos: {
            x: 79,
            y: 40,
          },
          velocity: {
            x: 0,
            y: -1,
          },
          trail: [],
          tail: 5,
        },
        fruits: [
          GenerateFruitPositionDual(
            [],
            [],
            this.state.fruits,
            this.state.tileCount
          ),
          GenerateFruitPositionDual(
            [],
            [],
            this.state.fruits,
            this.state.tileCount
          ),
        ],
      });
      clearInterval(this.intervalId);
      this.renderMain();
    });
  }

  move() {
    this.setState({
      ...this.state,
      player1: {
        ...this.state.player1,
        playerPos: {
          x: this.state.player1.playerPos.x + this.state.player1.velocity.x,
          y: this.state.player1.playerPos.y + this.state.player1.velocity.y,
        },
      },
      player2: {
        ...this.state.player2,
        playerPos: {
          x: this.state.player2.playerPos.x + this.state.player2.velocity.x,
          y: this.state.player2.playerPos.y + this.state.player2.velocity.y,
        },
      },
    });
  }

  isGameOver() {
    // out of bound check

    //player1 hits wall

    if (
      this.state.player1.playerPos.x < 0 ||
      this.state.player1.playerPos.x > this.state.tileCount.x - 1 ||
      this.state.player1.playerPos.y < 0 ||
      this.state.player1.playerPos.y > this.state.tileCount.y - 1
    ) {
      return "Player2 wins!";
    }

    //player2 hits wall
    if (
      this.state.player2.playerPos.x < 0 ||
      this.state.player2.playerPos.x > this.state.tileCount.x - 1 ||
      this.state.player2.playerPos.y < 0 ||
      this.state.player2.playerPos.y > this.state.tileCount.y - 1
    ) {
      return "Player1 wins!";
    }

    //collision check

    //two heads collide
    if (
      this.state.player1.playerPos.x === this.state.player2.playerPos.x &&
      this.state.player1.playerPos.y === this.state.player2.playerPos.y
    )
      return "Draw";

    //player1 self-collide
    for (var i = 0; i < this.state.player1.trail.length - 1; i++) {
      if (
        this.state.player1.playerPos.x === this.state.player1.trail[i].x &&
        this.state.player1.playerPos.y === this.state.player1.trail[i].y
      ) {
        return "Player2 wins!";
      }
    }

    //player2 hits player1's body
    for (var i = 0; i < this.state.player1.trail.length - 1; i++) {
      if (
        this.state.player2.playerPos.x === this.state.player1.trail[i].x &&
        this.state.player2.playerPos.y === this.state.player1.trail[i].y
      ) {
        return "Player1 wins!";
      }
    }

    //player2 self-collide
    for (var i = 0; i < this.state.player2.trail.length - 1; i++) {
      if (
        this.state.player2.playerPos.x === this.state.player2.trail[i].x &&
        this.state.player2.playerPos.y === this.state.player2.trail[i].y
      ) {
        return "Player1 wins!";
      }
    }

    //player1 hits player1's body
    for (var i = 0; i < this.state.player2.trail.length - 1; i++) {
      if (
        this.state.player1.playerPos.x === this.state.player2.trail[i].x &&
        this.state.player1.playerPos.y === this.state.player2.trail[i].y
      ) {
        return "Player2 wins!";
      }
    }

    return false;
  }

  updateFruit(index) {
    const updatedFruits = [...this.state.fruits];
    updatedFruits[index] = GenerateFruitPositionDual(
      this.state.player1.trail,
      this.state.player2.trail,
      this.state.fruits,
      this.state.tileCount
    );
    this.setState({
      fruits: updatedFruits,
    });
  }

  render() {
    this.move();
    this.state.player1.isKeyPressed = false;
    this.state.player2.isKeyPressed = false;

    const result = this.isGameOver();
    if (result) {
      this.onGameState = false;

      const overlay = document.createElement("div");
      overlay.classList = "overlay";

      const modal = document.createElement("div");
      modal.classList = "modal";

      modal.innerHTML = `
            <h1>${result}</h1>
            <span class="btn exit">Exit</span>
          `;

      overlay.appendChild(modal);
      this.$target.appendChild(overlay);

      const exit = this.$target.querySelector(".exit");
      exit.addEventListener("click", () => {
        this.isPaused = false;
        this.setState({
          player1: {
            playerPos: {
              x: 0,
              y: -1,
            },
            trail: [],
            tail: 5,
            velocity: {
              x: 0,
              y: 1,
            },
          },
          player2: {
            playerPos: {
              x: 79,
              y: 40,
            },
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
          fruits: [
            GenerateFruitPositionDual(
              [],
              [],
              this.state.fruits,
              this.state.tileCount
            ),
            GenerateFruitPositionDual(
              [],
              [],
              this.state.fruits,
              this.state.tileCount
            ),
          ],
        });
        clearInterval(this.intervalId);
        this.renderMain();
      });

      clearInterval(this.intervalId);
    }

    this.$canvasContext.fillStyle = "black";
    this.$canvasContext.fillRect(0, 0, this.$canvas.width, this.$canvas.height);

    this.state.player1.trail.push({
      x: this.state.player1.playerPos.x,
      y: this.state.player1.playerPos.y,
    });
    while (this.state.player1.trail.length > this.state.player1.tail)
      this.state.player1.trail.shift();

    this.state.player2.trail.push({
      x: this.state.player2.playerPos.x,
      y: this.state.player2.playerPos.y,
    });
    while (this.state.player2.trail.length > this.state.player2.tail)
      this.state.player2.trail.shift();

    //draw player1
    this.$canvasContext.fillStyle = "lime";
    this.state.player1.trail.forEach((body) => {
      this.$canvasContext.fillRect(
        body.x * this.state.gridSize,
        body.y * this.state.gridSize,
        this.state.gridSize - 2,
        this.state.gridSize - 2
      );
    });

    // draw player 2
    this.$canvasContext.fillStyle = "blue";
    this.state.player2.trail.forEach((body) => {
      this.$canvasContext.fillRect(
        body.x * this.state.gridSize,
        body.y * this.state.gridSize,
        this.state.gridSize - 2,
        this.state.gridSize - 2
      );
    });

    //get fruit

    let index;

    //player1 hits fruit

    if (
      this.state.fruits.some((pos, i) => {
        index = i;
        return (
          pos.x === this.state.player1.playerPos.x &&
          pos.y === this.state.player1.playerPos.y
        );
      })
    ) {
      this.updateFruit(index);
      this.state.player1.tail++;
    }

    //player2 hits fruits
    if (
      this.state.fruits.some((pos, i) => {
        index = i;
        return (
          pos.x === this.state.player2.playerPos.x &&
          pos.y === this.state.player2.playerPos.y
        );
      })
    ) {
      this.updateFruit(index);
      this.state.player2.tail++;
    }

    this.$canvasContext.fillStyle = "red";
    this.$canvasContext.fillRect(
      this.state.fruits[0].x * this.state.gridSize,
      this.state.fruits[0].y * this.state.gridSize,
      this.state.gridSize - 2,
      this.state.gridSize - 2
    );
    this.$canvasContext.fillRect(
      this.state.fruits[1].x * this.state.gridSize,
      this.state.fruits[1].y * this.state.gridSize,
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
