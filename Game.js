import { GenerateFruitPosition } from "./utils.js";

export default class Game {
  $target;
  $canvas;
  $canvasContext;

  intervalId;

  state = {
    playerPos: {
      x: 10,
      y: 10,
    },
    gridSize: 20,
    tileCount: 20,
    trail: [],
    tail: 5,
    velocity: {
      x: 0,
      y: -1,
    },
    fruitPos: { x: 5, y: 5 },
  };

  constructor({ $target }) {
    this.$target = $target;
  }

  setState(nextState) {
    this.state = {
      ...this.state,
      ...nextState,
    };
  }

  setUp() {
    console.log("setup");
    this.$target.innerHTML = `
        <canvas id="canvas" width="400" height="400"></canvas>
    `;
    this.$canvas = document.getElementById("canvas");
    this.$canvasContext = this.$canvas.getContext("2d");
    addEventListener("keydown", (event) => this.keyPress(event));
  }

  keyPress(event) {
    switch (event.key) {
      case "ArrowUp":
        this.state.velocity.y !== 1
          ? this.setState({ velocity: { x: 0, y: -1 } })
          : null;
        break;
      case "ArrowDown":
        this.state.velocity.y !== -1
          ? this.setState({ velocity: { x: 0, y: 1 } })
          : null;
        break;
      case "ArrowLeft":
        this.state.velocity.x !== 1
          ? this.setState({ velocity: { x: -1, y: 0 } })
          : null;
        break;
      case "ArrowRight":
        this.state.velocity.x !== -1
          ? this.setState({ velocity: { x: 1, y: 0 } })
          : null;
        break;
    }
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

    // self-eating check
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
      //...this.state,
      fruitPos: GenerateFruitPosition(this.state.trail, this.state.tileCount),
    });
  }

  render() {
    this.move();

    if (this.isGameOver()) {
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
        this.state.tileCount - 2,
        this.state.tileCount - 2
      );
    });

    if (
      this.state.playerPos.x === this.state.fruitPos.x &&
      this.state.playerPos.y === this.state.fruitPos.y
    ) {
      this.updateFruit();
      this.state.tail++;
    }

    this.$canvasContext.fillStyle = "red";
    this.$canvasContext.fillRect(
      this.state.fruitPos.x * this.state.gridSize,
      this.state.fruitPos.y * this.state.gridSize,
      this.state.tileCount - 2,
      this.state.tileCount - 2
    );
  }

  gameLoop() {
    this.intervalId = setInterval(() => {
      this.render();
    }, 1000 / 15);
  }
}
