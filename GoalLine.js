'use strict';

function GoalLine (canvas, color){
  //Obstacle.call(canvas,this.canvas.width/2,this.canvas.width,20,color);
  Obstacle.call(this,canvas,250,500,20,color);
}

GoalLine.prototype = Object.create(Obstacle.prototype)
GoalLine.prototype.constructor = GoalLine; 
