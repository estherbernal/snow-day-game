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

  //crea la meta después de x segundos

  //hace el loop
  var loop = () =>{
    //crea flags random
    if(Math.random()>0.98){
      var randomX = Math.random()*this.canvas.width;
      var newFlag = new Obstacle(this.canvas, randomX);
      this.flags.push(newFlag);

    }
    this.flags



    this.clear();
    this.update();
    this.draw();
    this.checkCollision();

    requestAnimationFrame(loop);
  };
  loop();
};

Game.prototype.clear = function(){
  this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
}

Game.prototype.update = function(){
  this.player.move();
  this.flags.forEach(function(flag){
    flag.move();
  });
  //actualiza la posición de la meta
}

Game.prototype.draw = function(){
  this.player.draw(); 
  this.flags.forEach(function(flag){
    flag.draw();
  });
  //redibuja la meta
}

Game.prototype.checkCollision = function(){
  // comprueba colisión entre player y bandera
  this.flags.forEach((flag,index) => {
    var rightLeft = this.player.x + this.player.width/2 >= flag.x - flag.width/2;
    var leftRight = this.player.x <= flag.x + flag.width/2;
    var topBottom = this.player.y + this.player.height/2 >= flag.y - flag.height/2;
    var bottomTop = this.player.y <= flag.y + flag.height/2;   

  
    if(rightLeft && leftRight && topBottom && bottomTop){
      this.score += 100;
      this.flags.splice(index,1);

      console.log(this.score);
    }
  })

  //comprueba colisión entre player y meta
}