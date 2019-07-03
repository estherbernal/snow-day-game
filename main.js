'use strict';

function main(){

  var mainSection = document.querySelector('#main-section');

  function buildDom(html){
    mainSection.innerHTML = html;
    return mainSection;
  }

  function createSplashScreen(){
    var splashContent = `
    <article>
      <h1>Snow Day</h1>
      <button id="start-button">Start</button>
    </article>
    `;

    buildDom(splashContent);
    
    var startButton = document.querySelector('#start-button');
    startButton.addEventListener('click', createGameScreen);
  }



  function createGameScreen(){
    var gameContent = `
    <canvas id="canvas"></canvas>
    `;
    buildDom(gameContent);

    var canvas =  document.querySelector('#canvas');
    canvas.width = '500';
    canvas.height = '800';
    var game = new Game(canvas);
    game.gameEndCallback(createRestartScreen);
    game.startGame();
    
    document.addEventListener('keydown',function(event){
      if(event.key === 'ArrowLeft'){
        game.player.setDirection(-1);
      }else if(event.key === 'ArrowRight'){
        game.player.setDirection(1);
      };
    }); 

    document.addEventListener('keyup',function(event){
        game.player.setDirection(0);
    });
    /* Desaceleración cambiar velocidad a 0*/
    /*
    var deceleration = null;
    document.addEventListener('keydown',function(event){
      if(deceleration){
        clearInterval(deceleration);
      }
      if(event.key === 'ArrowLeft'){
        game.player.velocity = 0;
        game.player.direction = 0;
        game.player.setDirection(-1);
        for(var i= game.player.velocity; i<5; i++){
          game.player.velocity = game.player.velocity + 1;
        }
      }else if(event.key === 'ArrowRight'){
        game.player.velocity = 0;
        game.player.direction = 0;
        game.player.setDirection(1);
        for(var i= game.player.velocity; i<5; i++){
          game.player.velocity = game.player.velocity + 1;
        }
      };
    }); 
    

    document.addEventListener('keyup',function(){
      deceleration = setInterval(function(){
        game.player.velocity = game.player.velocity - 2;
        if(game.player.velocity<=0){
          game.player.direction = 0;
          game.player.velocity = 0;
          clearInterval(deceleration);
          game.player.setDirection(0);
        }
      },200);
    });
    */
  };




  function createRestartScreen(){
    var restartContent = `
    <article>
      <h1>Snow Day</h1>
      <button id="restart-button">Restart</button>
    </article>
    `;
    buildDom(restartContent);

    var restartButton = document.querySelector('#restart-button');
    restartButton.addEventListener('click',createGameScreen);
  }

  createSplashScreen();
}

window.addEventListener('load',main);