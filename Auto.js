import { CompareRank, GenerateFruitPosition } from "./utils.js";

export default class Auto {
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
        e:0,
        u:0,
        r:0,
        d:0,
        l:0,
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
        // this.keyPress();

        addEventListener("keydown", (event) => this.keyPress(event));
    }

    keyPress() {
        if (this.isKeyPressed || this.isPaused) return;
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
                e:0,
                u:0,
                r:0,
                d:0,
                l:0,
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
                e:0,
                u:0,
                r:0,
                d:0,
                l:0,
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
     getDistance(fx,fy,px,py) {
        let distanceX = fx - px;
        let distanceY = fy - py;
        return Math.sqrt(Math.pow(distanceX,2) + Math.pow(distanceY,2));
        /*
         this.state.e= Math.sqrt(Math.pow(distanceX,2) + Math.pow(distanceY,2));
         localStorage.setItem("e", this.state.e);
*/

    }
    drawPath(){
        ctx.strokeStyle = "blue";
        for(let i=0; i<path.length -1; i++){
            ctx.beginPath();
            ctx.moveTo(path[i].x, path[i].y);
            ctx.lineTo(path[i+1].x, path[i+1].y);
            ctx.stroke();
            ctx.closePath();
        }
    }


    die(x,y)
    {
        for (var i = 0; i < this.state.trail.length - 1; i++) {
            if (
                this.state.playerPos.x+x === this.state.trail[i].x &&
                this.state.playerPos.y+y === this.state.trail[i].y
            ) {
                return true;
            }
        }

        return false;
    }
    move() {
        var up=this.getDistance(this.state.fruitPos.x,this.state.fruitPos.y,this.state.playerPos.x,this.state.playerPos.y +1);
        var right=this.getDistance(this.state.fruitPos.x,this.state.fruitPos.y,this.state.playerPos.x+1,this.state.playerPos.y);
        var down=this.getDistance(this.state.fruitPos.x,this.state.fruitPos.y,this.state.playerPos.x,this.state.playerPos.y-1);
        var left=this.getDistance(this.state.fruitPos.x,this.state.fruitPos.y,this.state.playerPos.x-1,this.state.playerPos.y);

        if(Math.min( Math.min(Math.min(right, down),left),up)===up){

            if ((this.state.velocity.y !== -1)&&(this.die(0,1)===false)) {
                this.setState({velocity: {x: 0, y: 1}});
            } else

                    if (this.state.velocity.x !== -1 && Math.min(Math.min(right, down),left)===right && this.die(1,0)===false){
                this.setState({velocity: {x: 1, y: 0}});
                    }else

                        if ((this.state.velocity.x !== 1)&& Math.min(left, down)===left && this.die(-1,0)===false){
                            this.setState({velocity: {x: -1, y: 0}});
                        }else

                                  if ((this.state.velocity.y !== 1) && this.die(0,-1)===false){
                                    this.setState({velocity: {x: 0, y: -1}});}
        }
        //по первому
        if(Math.min( Math.min(Math.min(right, down),left),up)===right){

            if ((this.state.velocity.x !== -1) &&(this.die(1,0)===false)){
                this.setState({velocity: {x: 1, y: 0}})
            } else

                if ((this.state.velocity.y !== -1)&& Math.min(Math.min(up, down),left)===up && this.die(0,1)===false) {
                    this.setState({velocity: {x: 0, y: 1}});

                }else if ((this.state.velocity.x !== 1)&& Math.min(left, down)===left &&this.die(-1,0)===false) {
                    this.setState({velocity: {x: -1, y: 0}});}

                         else if ((this.state.velocity.y !== 1)&&this.die(0,-1)===false) {
                               this.setState({velocity: {x: 0, y: -1}});}


        }

        if(Math.min( Math.min(Math.min(right, down),left),up)===down){

            if ((this.state.velocity.y !== 1)&&this.die(0,-1)===false) {
                this.setState({velocity: {x: 0, y: -1}});}else

            if ((this.state.velocity.x !== -1) && Math.min(Math.min(right,left),up)===right &&(this.die(1,0)===false)){
                this.setState({velocity: {x: 1, y: 0}})
            } else

            if ((this.state.velocity.y !== -1)&& Math.min(up,left)===up && this.die(0,1)===false) {
                this.setState({velocity: {x: 0, y: 1}});

            }else if ((this.state.velocity.x !== 1)&&this.die(-1,0)===false) {
                this.setState({velocity: {x: -1, y: 0}});}


        }





        if((Math.min( Math.min(Math.min(right, down),left),up)===left)&&(this.die()===false)){

            if ((this.state.velocity.x !== 1)&&this.die(-1,0)===false) {
                this.setState({velocity: {x: -1, y: 0}});}

            else
            if ((this.state.velocity.x !== -1) && Math.min(Math.min(right,down),up)===right &&(this.die(1,0)===false)){
                this.setState({velocity: {x: 1, y: 0}})
            } else

            if ((this.state.velocity.y !== -1) && Math.min(up,down)===up && this.die(0,1)===false) {
                this.setState({velocity: {x: 0, y: 1}});

            }else if ((this.state.velocity.y !== 1)&&this.die(0,-1)===false) {
                this.setState({velocity: {x: 0, y: -1}});}
        }









/*
        if(this.state.velocity.y !== -1) {

            if (Math.min(Math.min(right, left), up) === up && this.die(0, 1) === false) {
                this.setState({velocity: {x: 0, y: 1}});
            }else

            if (Math.min(right, left) === right && this.die(1, 0) === false) {
                this.setState({velocity: {x: 1, y: 0}});
            }else

            if ( this.die(-1,0)===false) {
                this.setState({velocity: {x: -1, y: 0}});
            }
        }



        if(this.state.velocity.y !== 1) {
            if (Math.min(Math.min(right, down), left) === right && this.die(1, 0) === false) {
                this.setState({velocity: {x: 1, y: 0}});
            }else
            if (Math.min( down, left) === down && this.die(0, -1) === false) {
                this.setState({velocity: {x: 0, y: -1}});
            }else
            if ( this.die(-1, 0) === false) {
                this.setState({velocity: {x: -1, y: 0}});
            }




            if (this.state.velocity.x !== 1) {
                if (Math.min(Math.min(up, down), left) === up && this.die(0, 1) === false) {
                    this.setState({velocity: {x: 0, y: 1}});
                }
                if (Math.min( down, left) === down && this.die(0, -1) === false) {
                    this.setState({velocity: {x: 0, y: -1}});
                }else
                if ( this.die(-1, 0) === false) {
                    this.setState({velocity: {x: -1, y: 0}});
                }
            }




            if (this.state.velocity.x !== -1) {
                if (Math.min(Math.min(up, down), right) === up && this.die(0, 1) === false) {
                    this.setState({velocity: {x: 0, y: 1}});
                }
                if (Math.min( down, right) === down && this.die(0, -1) === false) {
                    this.setState({velocity: {x: 0, y: -1}});
                }
                if (this.die(1, 0) === false) {
                    this.setState({velocity: {x: 1, y: 0}});
                }
            }

        }*/
/*

            if( Math.min(Math.min(right,left),up)===up && this.die(0,1)===false){
                    this.setState({velocity: {x: 0, y: 1}});}else
                if (this.die(1,0)===false && Math.min(right,left)===right){
                    this.setState({velocity: {x: 1, y: 0}});}else
                if (this.die(-1,0)===false){
                    this.setState({velocity: {x: -1, y: 0}});}
            }

            if( Math.min(Math.min(right,left),up)===right){

                        if (this.die(1,0)===false){
                            this.setState({velocity: {x: 1, y: 0}})}else
                        if (this.die(0,1)===false && Math.min(up,left)===up) {
                            this.setState({velocity: {x: 0, y: 1}});}else
                        if (this.die(-1,0)===false) {
                            this.setState({velocity: {x: -1, y: 0}});}

            }

            if( Math.min(Math.min(right, up),left)===left){

                if (this.die(-1,0)===false){
                    this.setState({velocity: {x: -1, y: 0}})}else
                if (this.die(0,1)===false&&Math.min(right, up)===up){
                    this.setState({velocity: {x: 0, y: 1}})}else
                if (this.die(1,0)===false){
                    this.setState({velocity: {x: 1, y: 0}})}
            }
}*/




/*

            if(this.state.velocity.y !== 1){
            if( Math.min(Math.min(right, down),left)===right){

                if (this.die(-1,0)===false ){
                    this.setState({velocity: {x: -1, y: 0}})}else
                        if (this.die(0,-1)===false&& Math.min(left, down)===down)
                {this.setState({velocity: {x: 0, y: -1}});}else
                        if (this.die(-1,0)===false)
                        {this.setState({velocity: {x: -1, y: 0}});}


            }
                if( Math.min(Math.min(right, down),left)===down){
                    if (this.die(0,-1)===false)
                    {  this.setState({velocity: {x: 0, y: -1}});}else
                    if (this.die(1,0)===false && Math.min(right, left)==right){
                        this.setState({velocity: {x: 1, y: 0}});}else
                    if (this.die(-1,0)===false){
                        this.setState({velocity: {x: -1, y: 0}});}
                }

            if( Math.min(Math.min(right, down),left)===left){

                if ((this.die(-1,0)===false)){
                    this.setState({velocity: {x: -1, y: 0}})}else
                if (this.die(0,-1)===false && Math.min(right, down)===down){
                    this.setState({velocity: {x: 0, y: -1}})}else
                if (this.die(-1,0)===false){
                    this.setState({velocity: {x: -1, y: 0}})}
            }

        }




*/
/*

        if(this.state.velocity.x !== 1){
            if( Math.min(Math.min(up, down),left)===up){
                if (this.die(0,1)===false)
                {  this.setState({velocity: {x: 0, y: 1}});}else
                if (this.die(-1,0)===false && Math.min(left, down)===left){
                    this.setState({velocity: {x: -1, y: 0}});}else
                if (this.die(0,-1)===false){
                    this.setState({velocity: {x: 0, y: -1}});}

            }
            if(Math.min(Math.min(up, down),left)===left){

                if (this.die(-1,0)===false){
                    this.setState({velocity: {x: -1, y: 0}})}else
                if (this.die(0,1)===false && Math.min(up, down)===up){
                    this.setState({velocity: {x: 0, y: 1}})}else
                if (this.die(0,-1)===false){
                    this.setState({velocity: {x: 0, y: -1}})}
            }
            if(Math.min(Math.min(up, down),left)===down){

                if (this.die(0,-1)===false){
                    this.setState({velocity: {x: 0, y: -1}})}else
                if (this.die(-1,0)===false && Math.min(up, left)===left){
                    this.setState({velocity: {x: -1, y: 0}})}else
                if (this.die(0,1)===false){
                    this.setState({velocity: {x: 0, y: 1}})}
            }

        }
*/



/*

        if(this.state.velocity.x !== -1){
            if( Math.min(Math.min(right, down),up)===up){
                if (this.die(0,1)===false)
                {  this.setState({velocity: {x: 0, y: 1}});}else
                if (this.die(1,0)===false && Math.min(right, down)===right){
                    this.setState({velocity: {x: 1, y: 0}});}else
                if (this.die(0,-1)===false){
                    this.setState({velocity: {x: 0, y: -1}});}
            }
            if( Math.min(Math.min(right, down),up)===down){

                if (this.die(0,-1)===false){
                    this.setState({velocity: {x: 0, y: -1}})}else
                if (this.die(1,0)===false && Math.min(right, up)===right){
                    this.setState({velocity: {x: 1, y: 0}})}else
                if (this.die(0,1)===false){
                    this.setState({velocity: {x: 0, y: 1}})}
            }

            if( Math.min(Math.min(right, down),up)===right){

                if (this.die(-1,0)===false){
                    this.setState({velocity: {x: -1, y: 0}})}else
                if (this.die(0,1)===false && Math.min(up, down)===up){
                    this.setState({velocity: {x: 0, y: 1}})}else
                if (this.die(0,-1)===false){
                    this.setState({velocity: {x: 0, y: -1}})}
            }
        }


*/



//this.getDistance();
//if (this.state.fruitPos.y<39&&this.state.fruitPos.y>0){
        // var n =Math.hypot(cell[0] - point[0], cell[1] - point[1]);
/*
        if (this.state.playerPos.y > this.state.fruitPos.y) {
            this.state.velocity.y !== 1
                ? this.setState({velocity: {x: 0, y: -1}})
                : null;
        }
        if (this.state.playerPos.y < this.state.fruitPos.y) {
            this.state.velocity.y !== -1
                ? this.setState({velocity: {x: 0, y: 1}})
                : null;
        }
        if (this.state.playerPos.x < this.state.fruitPos.x) {
            this.state.velocity.x !== -1
                ? this.setState({velocity: {x: 1, y: 0}})
                : null;

        }
        if (this.state.playerPos.x > this.state.fruitPos.x) {
            this.state.velocity.x !== 1
                ? this.setState({velocity: {x: -1, y: 0}})
                : null;
        }
    this.setState({
                      ...this.state,
    playerPos: {
        x: this.state.playerPos.x + this.state.velocity.x,
        y: this.state.playerPos.y + this.state.velocity.y,
    },
});*/
/*
        var up=this.getDistance(this.state.fruitPos.x,this.state.fruitPos.y,this.state.playerPos.x,this.state.playerPos.y +1);
        var right=this.getDistance(this.state.fruitPos.x,this.state.fruitPos.y,this.state.playerPos.x+1,this.state.playerPos.y);
        var down=this.getDistance(this.state.fruitPos.x,this.state.fruitPos.y,this.state.playerPos.x,this.state.playerPos.y-1);
        var left=this.getDistance(this.state.fruitPos.x,this.state.fruitPos.y,this.state.playerPos.x-1,this.state.playerPos.y);

        if(Math.min( Math.min(Math.min(right, down),left),up)===up){
           if ((this.state.velocity.y !== -1)&&(this.die(0,1)===false))
           {  this.setState({velocity: {x: 0, y: 1}});}else
               if (this.die(1,0)===false){
                   this.setState({velocity: {x: 1, y: 0}});}
        }
        if(Math.min( Math.min(Math.min(right, down),left),up)===right){

           if ((this.state.velocity.x !== -1) &&(this.die(1,0)===false)){
               this.setState({velocity: {x: 1, y: 0}})
           }else if (this.die(0,1)===false)
           {this.setState({velocity: {x: 0, y: 1}});}

        }
        if(Math.min( Math.min(Math.min(right, down),left),up)===down){

          if ((this.state.velocity.y !== 1)&&(this.die(0,-1)===false)){
                 this.setState({velocity: {x: 0, y: -1}})}else
          if (this.die(-1,0)===false){
                 this.setState({velocity: {x: -1, y: 0}})}
        }

        if((Math.min( Math.min(Math.min(right, down),left),up)===left)&&(this.die()===false)){

          if (( this.state.velocity.x !== 1)&&(this.die(-1,0)===false)){
                 this.setState({velocity: {x: -1, y: 0}})}else
         if (this.die(0,1)===false){
                 this.setState({velocity: {x: 0, y: 1}})}
        }

*/
/*
                if(this.state.velocity.y !== -1){//-down
                    var min=Math.min(Math.min(right, down),left);
                    if(min===right){this.setState({velocity: {x: 1, y: 0}})}
                         else if (min===down){his.setState({velocity: {x: 0, y: 1}})}
                                else if (min===left){this.setState({velocity: {x: -1, y: 0}})} }

                if(this.state.velocity.y !== 1){//-up
                    var min=Math.min(Math.min(right, up),left);
                    if(min===right){this.setState({velocity: {x: 1, y: 0}})}
                    else if (min===up){his.setState({velocity: {x: 0, y: -1}})}
                    else if (min===left){this.setState({velocity: {x: -1, y: 0}})} }

                if(this.state.velocity.x !== 1){//left
                    var min=Math.min(Math.min(right, up),left);
                    if(min===right){this.setState({velocity: {x: 1, y: 0}})}
                    else if (min===up){his.setState({velocity: {x: 0, y: -1}})}
                    else if (min===down){this.setState({velocity: {x: 0, y: 1}})} }

                if(this.state.velocity.y !== 1){//right
                    var min=Math.min(Math.min(right, up),left);
                    if(min===down){this.setState({velocity: {x: 0, y: 1}})}
                    else if (min===up){his.setState({velocity: {x: 0, y: -1}})}
                    else if (min===left){this.setState({velocity: {x: -1, y: 0}})} }*/
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

    render() {
        this.getDistance(this.state.fruitPos.x,this.state.fruitPos.y,this.state.playerPos.x,this.state.playerPos.y);
       // this.state.u=this.getDistance(this.state.fruitPos.x,this.state.fruitPos.y,this.state.playerPos.x,this.state.playerPos.y +1);
       // this.state.r=this.getDistance(this.state.fruitPos.x,this.state.fruitPos.y,this.state.playerPos.x+1,this.state.playerPos.y);
       // this.state.d=this.getDistance(this.state.fruitPos.x,this.state.fruitPos.y,this.state.playerPos.x,this.state.playerPos.y-1);
       // this.state.l=this.getDistance(this.state.fruitPos.x,this.state.fruitPos.y,this.state.playerPos.x-1,this.state.playerPos.y);

       // localStorage.setItem("u", this.state.u);
      //  localStorage.setItem("r", this.state.r);
      //  localStorage.setItem("d", this.state.d);
       // localStorage.setItem("l", this.state.l);




        if (this.isGameOver()) {
            this.onGameState = false;
            localStorage.removeItem("state");

            const overlay = document.createElement("div");
            overlay.classList = "overlay";

            const modal = document.createElement("div");
            modal.classList = "modal";

            modal.innerHTML = `
            <h1>Snake died</h1>
            <span class="score">Score : ${this.state.score}</span>
            <form>
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
                    e:0,
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
                    e:0,
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
        this.$canvasContext.font = '15pt Calibri';
        this.$canvasContext.lineWidth = 3;
        this.$canvasContext.fillStyle = "grey";
        this.$canvasContext.fillText("Score:" + localStorage.getItem("score"), 10, 580);

        // Displaying
        this.$canvasContext.font = '15pt Calibri';
        this.$canvasContext.lineWidth = 3;
        this.$canvasContext.fillStyle = "grey";
        this.$canvasContext.fillText("snake:" + localStorage.getItem("e"), 80, 580);
        // Displaying
        var j=this.getDistance(this.state.fruitPos.x,this.state.fruitPos.y,this.state.playerPos.x,this.state.playerPos.y +1);
        this.$canvasContext.font = '15pt Calibri';
        this.$canvasContext.lineWidth = 3;
        this.$canvasContext.fillStyle = "grey";
        this.$canvasContext.fillText("u:" + j, 120, 550);
        this.move();
        this.isKeyPressed = false;

        /*
        // Displaying
        this.$canvasContext.font = '15pt Calibri';
        this.$canvasContext.lineWidth = 3;
        this.$canvasContext.fillStyle = "grey";
        this.$canvasContext.fillText("r:" + localStorage.getItem("r"), 160, 520);
        // Displaying
        this.$canvasContext.font = '15pt Calibri';
        this.$canvasContext.lineWidth = 3;
        this.$canvasContext.fillStyle = "grey";
        this.$canvasContext.fillText("d:" + localStorage.getItem("d"), 200, 490);
        // Displaying
        this.$canvasContext.font = '15pt Calibri';
        this.$canvasContext.lineWidth = 3;
        this.$canvasContext.fillStyle = "grey";
        this.$canvasContext.fillText("l:" + localStorage.getItem("l"), 240, 460);
*/
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
        }, 1000 / 50);
    }
}