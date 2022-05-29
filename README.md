# OSS Team Project - Snake Game (Team 07)

This is the Chung-ang univ OSS class Team Project with making a game of Snake. <br>


## Play the Game on Online!


You can [play the game](https://myeongbaek.github.io/SnakeGame_Team07/) from this link :

https://myeongbaek.github.io/SnakeGame_Team07/


## How to play


Start the game and move your snake with arrow key.
Your Snake will be longer when you eat up the apple. Get your best score and rank your record!!

[![game image](https://user-images.githubusercontent.com/65847457/166137395-9fecbfc9-c1ec-42d7-815d-46b3bccfec8d.png)
](https://github.com/myeongbaek/SnakeGame_Team07/issues/6#issue-1222061964)
                                    
## Implementation Details

<b>Source code : </b><br>
dr : mode <br/>
App.js <br/>
MainScreen.js <br/>
index.html  <br/>
index.js <br/>
style.css <br/><br/>

<b>mode : <br/>
dir : solver<br/>
  Auto.js <br/>
  Dual.js <br/>
  Single.js <br/>
  utils.js <br/>
  
 <b>solver : <br/>
   search.js<br/>
   solver.js<br/>

<b>Explanation : </b><br>
Our game is web console game running on index.html. From the index.html, the game style is implemented by style.css and the game module is implemented by index.js. 
Inside of the index.js, App object is generated. And App.js is generating the MainScreen object. 
So <b>index.html, index.js, style.css, and App.js</b> are the skeleton of our game.

   And the others of the source code, from the <b>MainScreen.js</b> mode <b>Single.j Dual.js Auto.js</b> are functioning during the game. 
MainScreen.js is defining MainScreen object and it show us mainscreen. Start, Dual Mode, Auto Play, Load, Rank, and Exit are implemented. Also their function is defined.
Single.js is defining Single object which is containing game state, snake movement, key input, puase action, gameover, and save. The state is stored at localstorage to show us score, save, and rank. Moreover utils.js is supporting Single.js by defining functions to calculate.
Similary Dual.js and Auto.js are defining each mode, state, game play, movement,,,


## Information

Team Number : 07 <br>
Team Member : KimHyeongWoo, Margarita, ChoiMyeongBaek<br>
Language : JavaScript<br>

