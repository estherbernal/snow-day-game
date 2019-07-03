'use strict';

function Obstacle(canvas, randomX, width, height,color){
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.width = width;
  this.height = height;
  this.x = randomX;
  this.y = this.canvas.height + this.height;
  this.velocity = 8;
  this.direction = -1;
  this.color = color;
};

Obstacle.prototype.draw = function(){
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect((this.x-this.width/2), (this.y-this.height/2), this.width, this.height)
};

Obstacle.prototype.move = function(){
  this.y = this.y + this.direction*this.velocity;
};

