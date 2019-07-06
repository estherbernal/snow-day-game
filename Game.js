'use strict';

function Game(canvas){
  this.player = null;
  this.obstacles = [];
  this.flags = [];
  this.snow = [];
  this.goal = null;
  this.score = 0;
  this.gameEnd = false;
  this.onGameEnd = null;
  this.alfa = false;
  this.counter = 0;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
}

Game.prototype.startGame = function(){
  //inicializa player
  this.player = new Player(this.canvas);
  
  //crea la meta después de x segundos
  setTimeout(() => {
    this.goal = new GoalLine(this.canvas);
  },20000); //20000

   //flags cada medio segundo
  setInterval(() => {
    var srcFlags = ['images/bandera1.png','images/bandera2.png','images/bandera3.png','images/bandera4.png'];
    var randomNum = Math.floor(Math.random() * srcFlags.length);
    var randomX =  Math.floor(Math.random() * (this.canvas.width/1.25 - this.canvas.width*0.25)) + this.canvas.width*0.25;
    var newFlag = new Obstacle(this.canvas, randomX, 20, 20,srcFlags[randomNum]);
    this.flags.push(newFlag);
  },500);
  
  //hace el loop
  var loop = () =>{
    //crear árboles random
    if(Math.random()>0.85){
      var srcObstacles = ['images/arbol1.png','images/arbol2.png'];
      var randomNum = Math.floor(Math.random() * srcObstacles.length);
      var randomX = Math.random()*this.canvas.width;
      var newObstacle = new Obstacle(this.canvas, randomX, 60, 80, srcObstacles[randomNum]);
      this.obstacles.push(newObstacle);
    }

    /*
    //crear copos de nieve
    if(Math.random()>0.97){
      var randomX = Math.random()*this.canvas.width;
      var newSnow = new Snow(this.canvas, randomX);
      this.snow.push(newSnow);
    }
    */

    this.clear();
    this.update();
    this.draw();
    this.checkCollision();

    if (!this.gameEnd){
      requestAnimationFrame(loop);
    }else{
      this.onGameEnd(this.score);
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
  /*
  this.snow.forEach(function(snow){
    snow.move();
  });
  */
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
  /*
  this.snow.forEach(function(snow){
    snow.draw();
  });
  */
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
      this.score += 200;
      this.flags.splice(index,1);

    }
  });
  // comprueba colisión entre player y árboles
  this.obstacles.forEach((obstacle) => {
    var rightLeft = this.player.x + this.player.width/2 >= obstacle.x - obstacle.width/2;
    var leftRight = this.player.x - this.player.width/2 <= obstacle.x + obstacle.width/2;
    var topBottom = this.player.y + this.player.height/2 >= obstacle.y - obstacle.height/2;
    var bottomTop = this.player.y - this.player.height/2 <= obstacle.y + obstacle.height/2;   

  
    if(rightLeft && leftRight && topBottom && bottomTop){
      this.score -= 5;
      //this.player.img.src = "images/player2-alfa.png";
      //this.alfa = true;
    
    /*
      var alfaInterval = setInterval(() => changeAlfa(this.player, this.alfa, this.counter),1000);

      var changeAlfa = (player, alfa) =>{  
        if (!alfa){
          player.img.src = "images/player2-alfa.png";
          this.alfa = true;
          this.counter ++;
          console.log(this.counter);
        }
        else{
          player.img.src = "images/player2.png";
          this.alfa = false;
        }
      } 
      if (this.counter >= 180){
        clearInterval(alfaInterval);
        this.counter = 0;
      }
      */
      
    }
  });
  //comprueba colisión entre player y meta
  if (this.goal){
    if(this.goal.y <= (this.player.y - this.player.height / 2 - 300)){
      this.gameEnd = true;
    }
  }
}


Game.prototype.gameEndCallback = function(callback){
  this.onGameEnd = callback;

}