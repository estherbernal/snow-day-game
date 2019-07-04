'use strict';

function GoalLine (canvas){
  //Obstacle.call(canvas,this.canvas.width/2,this.canvas.width,20,color);
  Obstacle.call(this,canvas,canvas.width/2,canvas.width,canvas.width/4,'images/meta.png');
}

GoalLine.prototype = Object.create(Obstacle.prototype)
GoalLine.prototype.constructor = GoalLine; 
