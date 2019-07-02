'use strict';

function Game(canvas){
  this.player = null;
  //this.obstacles = [];
  this.flags = [];
  this.score = 0;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
}

Game.prototype.startGame = function(){
  //inicializa player
  this.player = new Player(this.canvas);
  //crea flags random
  //crea la meta después de x segundos

  //hace el loop
  var loop = () =>{
    console.log('heyyy')
    this.clear();
    this.update();
    this.draw();

    requestAnimationFrame(loop);
  };
  loop();
};

Game.prototype.clear = function(){
  //limpia el canvas
  this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
}

Game.prototype.update = function(){
  //actualiza la posición de player
  this.player.move();
  
  //actualiza la posición de las flags
  //actualiza la posición de la meta
}

Game.prototype.draw = function(){
  //redibuja el player
  this.player.draw(); 
  //redibuja las banderas
  //redibuja la meta
}

Game.prototype.checkCollision = function(){
  // comprueba colisión entre player y bandera
  //comprueba colisión entre player y meta
}