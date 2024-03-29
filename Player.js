'use strict';

function Player(canvas){
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.width = 40;
  this.height = 62;
  this.x = this.canvas.width/2;
  this.y = this.height/2 + 30;
  this.velocity = 0;
  this.direction = 0;
  this.img = new Image();
  this.img.src = 'images/player2.png';
  this.color = this.image;
};

Player.prototype.draw = function(){
  this.ctx.drawImage(this.img,(this.x-this.width/2),(this.y-this.height/2), this.width, this.height);
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