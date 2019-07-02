# Snow Day

## Description
Go down the mountain and catch as many flags as you can!


## MVP (DOM - CANVAS)
The game should have 3 screens: splashScreen, gameScreen restartScreen. The player should move to left and right and cath all the flags to increase the score. When the player arrives to the gola line, the game should end and redirected to the restartScreen.

## Backlog
- add other kind of obstacles that substract score (trees) and assign to the positive obstacles a minor range of screen.
- add rankingScreen and add input at SplashScreen for save the name
- add difficulty levels with a velocity variation
- add bonuses (like golden flags)
- add other kind of negative obstacles (like other people)

## Data structure
### Game.js
#### Properties
player
flags
obstacles
goalLine
score
canvas
ctx

#### Methods
startGame()
update()
clear()
checkCollision()
draw()


### Player.js
#### Properties
x
y
width
height
velocity
direction
color/image
canvas
ctx
#### Methods
move()
draw()
setDirection()

### Obstacle.js
#### Properties
x
y
width
height
type
velocity
direction
color/image
canvas
ctx
#### Methods
move()
draw()

### GoalLine.js
#### Properties
x
y
width
height
type
velocity
direction
color/image
canvas
ctx
#### Methods
move()
draw()

## States y States Transitions
Definition of the different states and their transition (transition functions)

- splashScreen (button 'Start' -> gameScreen)
- gameScreen (when finish -> restartScreen)
- RestartScreen (button 'Restart' -> gameScreen)

## Task
- create files: main.js, Game.js, Player.js, Obstacle.js, GoalLine.js (inheritance of Obstacle.js)
- set up git and GitHub
- create 3 screens: SplashScreen, GameScreen, and RestartScreen (in main.js)
- create transitions between all screens
- create game loop (in Game.js) with update(), clean(), and draw(),
- create Player.js
- create a player in Game.js
- create move()function for player
- check collisions between player and de limit of Canvas
- create Obstacle.js
- create random obstacles in Game.js (flags)
- check collisions between player and obstacles
- create GoalLine.js as inheritance of Obstacle.js
- greate a goal line in Game.js after X seconds of game.
- check collisions between player and goal line.
- check endGame condition for finish.

## Links


### Trello
[Link url](https://trello.com)


### Git
URls for the project repo and deploy
[Link Repo](http://github.com)
[Link Deploy](http://github.com)


### Slides
URls for the project presentation (slides)
[Link Slides.com](http://slides.com)