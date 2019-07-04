// 'use strict';

// function Snow(canvas,randomX){
//   Obstacle.call(this,canvas,randomX,10,10,'images/copito.png');
// }

// Snow.prototype = Object.create(Obstacle.prototype);
// Snow.prototype.constructor = Snow; 


'use strict';

function Snow(canvas, randomX){
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.width = 10;
  this.height = 10;
  this.x = randomX;
  this.y = -10;
  this.velocity = Math.random();
  this.direction = 1;
  this.img = new Image();
  this.img.src = 'images/copito.png';
  this.color = this.image;
};

Snow.prototype.draw = function(){
  this.ctx.drawImage(this.img,(this.x-this.width/2),(this.y-this.height/2), this.width, this.height);
};

Snow.prototype.move = function(){
  this.y = this.y + this.direction*this.velocity;
};

