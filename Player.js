'use strict';

function Player(canvas){
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.width = 30;
  this.height = 57;
  this.x = this.canvas.width/2;
  this.y = this.height/2 + 20;
  this.velocity = 5;
  this.direction = 0;
  this.img = new Image();
  this.img.src = 'images/player.png';
  this.color = this.image;
};

Player.prototype.draw = function(){
  //this.ctx.fillStyle = this.color;
  //this.ctx.drawImage(this.img, 0, 0);
  this.ctx.drawImage(this.img,(this.x-this.width/2),(this.y-this.height/2), this.width, this.height);
  //this.ctx.fillRect((this.x-this.width/2), (this.y-this.height/2), this.width, this.height)
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