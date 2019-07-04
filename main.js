'use strict';

function main(){

  var mainSection = document.querySelector('#main-section');

  function buildDom(html){
    mainSection.innerHTML = html;
    return mainSection;
  }

  function createSplashScreen(){
    var splashContent = `
    <article class="screen splash-screen">
      <h1><span class="snow">Snow</span> Day</h1>
      <input placeholder="Your name here"></input>
      <button id="start-button">Start</button>
    </article>
    `;

    buildDom(splashContent);
    var startButton = document.querySelector('#start-button');
    startButton.addEventListener('click', saveData);
  }

  function saveData(){
    //salvo nombre
    var nameInput = document.querySelector('input').value;
    console.log(nameInput);

    localStorage.setItem('scores', JSON.stringify([{name:nameInput, socre:0}]));
    createGameScreen();
  }


  function createGameScreen(){
    var gameContent = `
    <canvas id="canvas">
    </canvas>
    `;
    buildDom(gameContent);

    var canvas =  document.querySelector('#canvas');
    // canvas.width = '500';
    // canvas.height = '800';
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
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

    document.addEventListener('keyup',function(){
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

  function createRestartScreen(score){
    var restartContent = `
    <article class="screen restart-screen">
      <h1>Your Score</h1>
      <p class="score"></p>
      <button id="restart-button">Restart</button>
    </article>
    `;
    buildDom(restartContent);
    var restartButton = document.querySelector('#restart-button');
    restartButton.addEventListener('click',createGameScreen);
    var scoreResult = document.querySelector('p');
    scoreResult.innerHTML = score;
  }

  createSplashScreen();
}

window.addEventListener('load',main);


