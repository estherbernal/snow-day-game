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
    <h1>Snow Day</h1>
    <button id="start-button">Start</button>
    `;

    buildDom(splashContent);
    
    var startButton = document.querySelector('#start-button');
    startButton.addEventListener('click', createGameScreen);
  }

  function createGameScreen(){
    var gameContent = `
    <canvas width="500" height="500"></canvas>
    `;
    buildDom(gameContent);
    setTimeout(createRestartScreen,3000);
  }

  function createRestartScreen(){
    var restartContent = `
    <h1>Snow Day</h1>
    <button id="restart-button">Restart</button>
    `;
    buildDom(restartContent);

    var restartButton = document.querySelector('#restart-button');
    restartButton.addEventListener('click',createGameScreen);
  }

  createSplashScreen();
}

window.addEventListener('load',main);