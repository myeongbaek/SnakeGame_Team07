import { GenerateFruitPosition } from "./utils.js";
import * as solver from "./solver.js";


export default class AutoGreedy {
    $target;
    $canvas;
    $canvasContext;

    intervalId;
    isPaused = false;
    onGameState = false;
    renderMain;

    trials = 30;
    score_sum = 0;

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
        if (this.isPaused) return;
        switch (event.key) {
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
                score: 0,
                playerPos: { x: 20, y: 20 },
                fruitPos: GenerateFruitPosition([], this.state.tileCount),
                velocity: { x: 0, y: -1 },
                trail: [],
                tail: 5,
            });
            this.gameLoop();
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

        // if (this.state.playerPos.x > this.state.fruitPos.x)
        //     this.state.velocity.x !== 1
        //         ? this.setState({ velocity: { x: -1, y: 0 } })
        //         : null;
        // else if (this.state.playerPos.x < this.state.fruitPos.x)
        //     this.state.velocity.x !== -1
        //         ? this.setState({ velocity: { x: 1, y: 0 } })
        //         : null;
        // else if (this.state.playerPos.y > this.state.fruitPos.y)
        //     this.state.velocity.y !== -1
        //         ? this.setState({ velocity: { x: 0, y: -1 } })
        //         : null;
        // else if (this.state.playerPos.y < this.state.fruitPos.y)
        //     this.state.velocity.y !== 1
        //         ? this.setState({ velocity: { x: 0, y: 1 } })
        //         : null;


        var direction = solver.getDirection(this.state);
        this.setState({ velocity: direction });
        this.setState({
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
            console.log("die : boundary collide");
            console.log(this.state);
            return true;
        }

        //self-eating check
        for (var i = 0; i < this.state.trail.length - 1; i++) {
            if (
                this.state.playerPos.x === this.state.trail[i].x &&
                this.state.playerPos.y === this.state.trail[i].y
            ) {
                console.log("die : self-eating");
                console.log(this.state);
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
        this.onGameState = true;


        // game overstate
        if (this.isGameOver()) {

            this.onGameState = false;
            this.trials--;
            this.score_sum += this.state.score;


            if (this.trials > 0) {
                console.log(this.trials);
                clearInterval(this.intervalId);

                // this.setState({
                //     playerPos: {
                //         x: 20,
                //         y: 20,
                //     },
                //     score: 0,
                //     gridSize: 15,
                //     tileCount: 40,
                //     trail: [],
                //     tail: 5,
                //     velocity: {
                //         x: 0,
                //         y: -1,
                //     },
                //     fruitPos: GenerateFruitPosition([], this.state.tileCount),
                // });

            }
            else {
                console.log(this.score_sum / 30);

                const overlay = document.createElement("div");
                const modal = document.createElement("div");
                overlay.classList = "overlay";
                modal.classList = "modal";
                modal.innerHTML = `
                    <h1>You died</h1>
                    <span class="score">Score : ${this.state.score}</span>                
                    <span class="btn exit">Exit</span>
                `;
                overlay.appendChild(modal);
                this.$target.appendChild(overlay);


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

                clearInterval(this.intervalId);
            }
        }
        // snake head location 
        this.state.trail.push(this.state.playerPos);
        while (this.state.trail.length > this.state.tail) this.state.trail.shift();


        // canvas style
        this.$canvasContext.fillStyle = "black";
        this.$canvasContext.fillRect(0, 0, this.$canvas.width, this.$canvas.height);

        // fill the snake move with lime colour
        this.$canvasContext.fillStyle = "lime";
        this.state.trail.forEach((body) => {
            this.$canvasContext.fillRect(
                body.x * this.state.gridSize,
                body.y * this.state.gridSize,
                this.state.gridSize - 2,
                this.state.gridSize - 2
            );
        });


        // snake bite the fruit => update the fruit location
        if (
            this.state.playerPos.x === this.state.fruitPos.x &&
            this.state.playerPos.y === this.state.fruitPos.y
        ) {
            this.updateFruit();
            this.state.tail++;
            this.state.score++;
        }


        // Displaying Score
        this.$canvasContext.font = "15pt Calibri";
        this.$canvasContext.lineWidth = 3;
        this.$canvasContext.fillStyle = "grey";
        this.$canvasContext.fillText(
            "Score:" + this.state.score,
            10,
            580
        );

        // Fruit location
        this.$canvasContext.fillStyle = "red";
        this.$canvasContext.fillRect(
            this.state.fruitPos.x * this.state.gridSize,
            this.state.fruitPos.y * this.state.gridSize,
            this.state.gridSize - 2,
            this.state.gridSize - 2
        );

        this.$canvasContext.fillStyle = "red";
        this.$canvasContext.fillRect(
            this.state.playerPos.x * this.state.gridSize,
            this.state.playerPos.y * this.state.gridSize,
            this.state.gridSize - 2,
            this.state.gridSize - 2
        );


    }

    gameLoop() {
        this.intervalId = setInterval(() => {
            this.render();
        }, 1000 / 200);
    }
}
