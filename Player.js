'use strict';

function Player(canvas){
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.width = 20;
  this.height = 20;
  this.x = this.canvas.width/2;
  this.y = this.height/2 + 20;
  this.velocity = 3;
  this.direction = 0;
  this.color = 'red';
};

Player.prototype.draw = function(){
  this.ctx.fillRect((this.x+this.width/2), (this.y+this.height/2), this.width, this.height)
};

Player.prototype.setDirection = function(newDirection){
  this.direction = newDirection;
};

Player.prototype.move = function(){
  this.x = this.x + this.direction*this.velocity;
};


