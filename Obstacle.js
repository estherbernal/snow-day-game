'use strict';

function Obstacle(canvas, randomX, width, height, src){
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.width = width;
  this.height = height;
  this.x = randomX;
  this.y = this.canvas.height + this.height;
  this.velocity = 8;
  this.direction = -1;
  this.img = new Image();
  this.img.src = src;
  //this.img.src = 'images/bandera1.png';
  this.color = this.image;
};

Obstacle.prototype.draw = function(){
  this.ctx.drawImage(this.img,(this.x-this.width/2),(this.y-this.height/2), this.width, this.height);
};

Obstacle.prototype.move = function(){
  this.y = this.y + this.direction*this.velocity;
};

