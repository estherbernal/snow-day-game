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
      <input placeholder="Your name here" focus></input>
      <button id="start-button">Start</button>
      <p id="error"></p>
    </article>
    `;
    buildDom(splashContent);
    document.querySelector('input').focus()
    var startButton = document.querySelector('#start-button');
    startButton.addEventListener('click', saveData);
  }

  function saveData(){
    //salvo nombre
    var nameInput = document.querySelector('input').value;
    if( nameInput){
      console.log(nameInput);
      var actualRanking= JSON.parse(localStorage.getItem('scores'));
      var newPlayer = {name:nameInput, score:0};
      if(!actualRanking){
        //localStorage.setItem('scores', JSON.stringify([{name:nameInput, score:0}]));
        localStorage.setItem('scores', JSON.stringify([{name:"Esther", score:10000},{name:"Sara", score:1300},{name:"Anna", score:2000},{name:"Joan", score:500},{name:nameInput, score:0}]));
        
      } else{
        actualRanking.push(newPlayer);
        localStorage.setItem('scores', JSON.stringify(actualRanking));
      }
      createGameScreen();
    } else {
      var errorText = document.querySelector('#error');
      errorText.classList.add('error-displayed');
      errorText.innerHTML = "Tienes que introducir tu nombre para empezar"
    }
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

    var deceleration = null;
    var keyPressed = [];
    document.addEventListener('keydown',function(event){
      clearInterval(deceleration);
      console.log(keyPressed);
      game.player.velocity = 5;
      if(event.key === 'ArrowLeft'){
        keyPressed[0]=true;
        game.player.setDirection(-1);
        game.player.img.src = 'images/player-left.png'
      }else if(event.key === 'ArrowRight'){
        keyPressed[1]=true;
        game.player.setDirection(1);
        game.player.img.src = 'images/player-right.png'
      };
    }); 

    document.addEventListener('keyup',function(){
      console.log(event.key);
      if(event.key === 'ArrowLeft'){
        keyPressed[0] = false;
      }
      if(event.key === 'ArrowRight'){
        keyPressed[1] = false;
      }
      if (keyPressed[0] || keyPressed[1]){
        return;
      }
      deceleration = setInterval(function(){
        game.player.velocity = game.player.velocity - 2;
        if(game.player.velocity<=0){
          game.player.direction = 0;
          game.player.velocity = 0;
          game.player.img.src = 'images/player2.png'
          clearInterval(deceleration);
          game.player.setDirection(0);
        }
      },200);
    });    
  };

  function createRestartScreen(score){
    var restartContent = `
    <article class="screen restart-screen">
      <h1>Your Score</h1>
      <p class="score"></p>
      <table class="ranking">
        <tr>
          <th colspan="2">High Scores</th>
        </tr>
        <tr>
          <td id="player1name" class="ranking-names"></td>
          <td id="player1score" class="ranking-scores"></td>
        </tr>
        <tr>
          <td id="player2name" class="ranking-names"></td>
          <td id="player2score" class="ranking-scores"></td>
        </tr>
        <tr>
          <td id="player3name" class="ranking-names"></td>
          <td id="player3score" class="ranking-scores"></td>
        </tr>
        <tr>
          <td id="player4name" class="ranking-names"></td>
          <td id="player4score" class="ranking-scores"></td>
        </tr>
        <tr>
          <td id="player5name" class="ranking-names"></td>
          <td id="player5score" class="ranking-scores"></td>
        </tr>
      </table>
      <button id="restart-button">Restart</button>
    </article>
    `;
    buildDom(restartContent);

    //actualizo score
    var actualRanking = JSON.parse(localStorage.getItem('scores'));
    actualRanking[actualRanking.length-1].score = score;

    function orderScores(arr){
      arr.sort(function(a,b){
        return (b.score - a.score)
      });  
    };

    orderScores(actualRanking);
    
    var nameP1 = document.querySelector('#player1name');
    var nameP2 = document.querySelector('#player2name');
    var nameP3 = document.querySelector('#player3name');
    var nameP4 = document.querySelector('#player4name');
    var nameP5 = document.querySelector('#player5name');

    var scoreP1 = document.querySelector('#player1score');
    var scoreP2 = document.querySelector('#player2score');
    var scoreP3 = document.querySelector('#player3score');
    var scoreP4 = document.querySelector('#player4score');
    var scoreP5 = document.querySelector('#player5score');

    nameP1.innerHTML = actualRanking[0].name;
    nameP2.innerHTML = actualRanking[1].name;
    nameP3.innerHTML = actualRanking[2].name;
    nameP4.innerHTML = actualRanking[3].name;
    nameP5.innerHTML = actualRanking[4].name;

    scoreP1.innerHTML = actualRanking[0].score;
    scoreP2.innerHTML = actualRanking[1].score;
    scoreP3.innerHTML = actualRanking[2].score;
    scoreP4.innerHTML = actualRanking[3].score;
    scoreP5.innerHTML = actualRanking[4].score;

    localStorage.setItem('scores', JSON.stringify(actualRanking));


    var restartButton = document.querySelector('#restart-button');
    restartButton.addEventListener('click',createSplashScreen);
    var scoreResult = document.querySelector('p');
    scoreResult.innerHTML = score;
  }

  createSplashScreen();
}

window.addEventListener('load',main);


