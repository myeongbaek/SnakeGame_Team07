class GameHandler {
  constructor() {}
  startGame() {
    const canvas = document.querySelector("#canvas");
    const canvasContext = canvas.getContext("2d");
    let setIntervalId;
    document.addEventListener("keydown", keyPush);
    document.addEventListener("keydown", (event) => {
      console.log(event);
      event.key === "Escape" ? clearInterval(setIntervalId) : null;
    });

    let playerX = 10;
    let playerY = 10;

    const gridSize = 20;
    const tileCount = 20;

    let appleX = 15;
    let appleY = 15;

    let trail = [];
    let tail = 5;

    function game() {
      playerX += velocityX;
      playerY += velocityY;
      if (playerX < 0) {
        playerX = tileCount - 1;
      }
      if (playerX > tileCount - 1) {
        playerX = 0;
      }
      if (playerY < 0) {
        playerY = tileCount - 1;
      }
      if (playerY > tileCount - 1) {
        playerY = 0;
      }

      canvasContext.fillStyle = "black";
      canvasContext.fillRect(0, 0, canvas.width, canvas.height);

      canvasContext.fillStyle = "lime";
      for (var i = 0; i < trail.length; i++) {
        canvasContext.fillRect(
          trail[i].x * gridSize,
          trail[i].y * gridSize,
          tileCount - 2,
          tileCount - 2
        );
        if (trail[i].x === playerX && trail[i].y === playerY) {
          tail = 5;
        }
      }

      if (appleX === playerX && appleY === playerY) {
        tail++;
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
      }

      trail.push({ x: playerX, y: playerY });
      while (trail.length > tail) {
        trail.shift();
      }

      canvasContext.fillStyle = "red";
      canvasContext.fillRect(
        appleX * gridSize,
        appleY * gridSize,
        gridSize - 2,
        gridSize - 2
      );
    }

    let velocityX = 0;
    let velocityY = -1;

    function keyPush(evt) {
      switch (evt.keyCode) {
        case 37:
          velocityX = -1;
          velocityY = 0;
          break;
        case 38:
          velocityX = 0;
          velocityY = -1;
          break;
        case 39:
          velocityX = 1;
          velocityY = 0;
          break;
        case 40:
          velocityX = 0;
          velocityY = 1;
          break;
      }
    }

    setIntervalId = setInterval(game, 1000 / 15);
  }
}
