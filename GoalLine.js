'use strict';

function GoalLine (canvas){
  Obstacle.call(this,canvas,canvas.width/2,canvas.width,canvas.width/4,'images/meta.png');
}

GoalLine.prototype = Object.create(Obstacle.prototype)
GoalLine.prototype.constructor = GoalLine; 
