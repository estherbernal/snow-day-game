'use strict';

function Game(canvas){
  this.player = null;
  this.obstacles = [];
  this.flags = [];
  this.goal = null;
  this.score = 0;
  this.gameEnd = false;
  this.ongameEnd = null;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
}

Game.prototype.startGame = function(){
  //inicializa player
  this.player = new Player(this.canvas, 'red');
  
  //crea la meta después de x segundos
  setTimeout(() => {
    this.goal = new GoalLine(this.canvas, 'yellow');
  },30000);

   //flags cada segundo
  setInterval(() => {
    var randomNum = Math.floor(Math.random() * (this.canvas.width/1.25 - 125)) + 125;
    var randomX = randomNum;
    var newFlag = new Obstacle(this.canvas, randomX, 20, 20, 'blue');
    this.flags.push(newFlag);
  },1000);
  
  //hace el loop
  var loop = () =>{
    //crear árboles random
    if(Math.random()>0.95){
      var randomX = Math.random()*this.canvas.width;
      var newObstacle = new Obstacle(this.canvas, randomX, 30, 40, 'black');
      this.obstacles.push(newObstacle);
    }


    this.clear();
    this.update();
    this.draw();
    this.checkCollision();


    if (!this.gameEnd){
      requestAnimationFrame(loop);
    }else{
      this.onGameEnd();
    }
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
  this.obstacles.forEach(function(obstacle){
    obstacle.move();
  });
  //actualiza la posición de la meta
  if(this.goal) {
    this.goal.move();
  }
}

Game.prototype.draw = function(){
  this.player.draw(); 
  this.flags.forEach(function(flag){
    flag.draw();
  });
  this.obstacles.forEach(function(obstacle){
    obstacle.draw();
  });
  //redibuja la meta
  if(this.goal) {
    this.goal.draw();
  }
}

Game.prototype.checkCollision = function(){
  // comprueba colisión entre player y bandera
  this.flags.forEach((flag,index) => {
    var rightLeft = this.player.x + this.player.width/2 >= flag.x - flag.width/2;
    var leftRight = this.player.x - this.player.width/2 <= flag.x + flag.width/2;
    var topBottom = this.player.y + this.player.height/2 >= flag.y - flag.height/2;
    var bottomTop = this.player.y - this.player.height/2 <= flag.y + flag.height/2;   

  
    if(rightLeft && leftRight && topBottom && bottomTop){
      this.score += 100;
      this.flags.splice(index,1);

      console.log(this.score);
    }
  });
  // comprueba colisión entre player y árboles
  this.obstacles.forEach((obstacle,index) => {
    var rightLeft = this.player.x + this.player.width/2 >= obstacle.x - obstacle.width/2;
    var leftRight = this.player.x - this.player.width/2 <= obstacle.x + obstacle.width/2;
    var topBottom = this.player.y + this.player.height/2 >= obstacle.y - obstacle.height/2;
    var bottomTop = this.player.y - this.player.height/2 <= obstacle.y + obstacle.height/2;   

  
    if(rightLeft && leftRight && topBottom && bottomTop){
      this.score -= 25;
      this.obstacles.splice(index,1);

      console.log(this.score);
    }
  });
  //comprueba colisión entre player y meta
  if (this.goal){
    if(this.goal.y <= (this.player.y - this.player.height / 2)){
      this.gameEnd = true;
    }
  }
}


Game.prototype.gameEndCallback = function(callback){
  this.onGameEnd = callback;
}