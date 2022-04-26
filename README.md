# OSS Team Project - Snake Game (Team 07)

This is the Chung-ang univ OSS class Team Project with making a game of Snake. We have wrote in JavaScript.

## Play the Game on Online!


You can [play the game](https://myeongbaek.github.io/SnakeGame_Team07/
) from this link :

https://myeongbaek.github.io/SnakeGame_Team07/


## How to play


Start the game and move your snake with arrow key.
Your Snake will be longer when you eat up the apple. Get your best score and rank your record!!
                                    
## Implementation Details

### Our project is consisted with those source code : 
App.js
Game.js
MainScreen.js
index.html 
index.js
style.css
utils.js

### Explanation about our game implementation details : 
Our game is web console game running on index.html. From the index.html, the game style is implemented by style.css and the game module is implemented by index.js. 
Inside of the index.js, App object is generated. And App.js is generating the MainScreen object. 
So index.html, index.js, style.css, and App.js are the skeleton of our game.

And the others of the source code, MainScreen.js, Game.js, and utils.js, are controlling inside of the game. 
MainScreen.js is defining MainScreen object and it show us mainscreen. Start, load, rank, and exit are implemented and their function is defined.
Game.js is defining Game object which is containing game state, snake movement, key input, puase action, gameover, and save. The state is stored at localstorage to show us score, save, and rank. Moreover utils.js is supporting Game.js by defining functions to calculate.


