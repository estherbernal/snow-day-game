'use strict';

function Player(canvas,color){
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.width = 50;
  this.height = 50;
  this.x = this.canvas.width/2;
  this.y = this.height/2 + 20;
  this.velocity = 5;
  this.direction = 0;
  this.color = color;
};

Player.prototype.draw = function(){
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect((this.x-this.width/2), (this.y-this.height/2), this.width, this.height)
};

Player.prototype.setDirection = function(newDirection){
  this.direction = newDirection;
};

Player.prototype.move = function(){
  this.checkCanvas();
  this.x = this.x + this.direction*this.velocity;  
};

Player.prototype.checkCanvas = function(){
  if(this.x < this.width/2){
    this.x = this.width/2;
  }else if(this.x > (this.canvas.width - this.width/2)){
    this.x = this.canvas.width - this.width/2;
  };
};