'use strict';

function main(){

  var mainSection = document.querySelector('#main-section');

  function buildDom(html){
    //mostrar en index.html lo que recibamos como html
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
    game.startGame();

    document.addEventListener('keydown',function(event){
      if(event.key === 'ArrowLeft'){
        console.log('izquierda')
        //game.player.direction = -1;
        game.player.setDirection(-1);
      }else if(event.key === 'ArrowRight'){
        console.log('derecha')
        //game.player.direction = 1;
        game.player.setDirection(1);
      };
    }); 

    document.addEventListener('keyup',function(event){
        game.player.setDirection(0);
    });
    
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