const gameOptions = document.querySelectorAll('.normal-1 .game-option');
const sectionForOptions = document.querySelector('.normal-1 .choose-move');
const sectionOpitonPicked = document.querySelector('.normal-1 .option-picked');
const scoreHTML = document.querySelector('.score-number');

function addEventInGameOptions() {
  gameOptions.forEach((option) => {
    option.addEventListener('click', optionPicked)
  })
}
addEventInGameOptions();

function optionPicked(e) {
  e.preventDefault();
  sectionForOptions.classList.remove('active');
  const playerPicked = this.dataset.game;
  const options = [...gameOptions].map(opt => opt.dataset.game);
  const enemyPicked = generateRandomPick(options);
  const result = gameResult(playerPicked, enemyPicked);
  setTimeout(() => {
    updateScore(result.class);
  }, 2000);
  addSectionOpitonClicked(playerPicked, enemyPicked, result);
  showLateEnemyPick(result);
}

function addSectionOpitonClicked(youPicked, enemyPicked, result) {
  const sectionHTML = `
  <div class="you-picked">
  <p>You picked</p>
  <div data-result="player">
    <div class="game-option" data-game="${youPicked}">
      <div>
        <img src="./images/icon-${youPicked}.svg" alt="${youPicked}">
      </div>
    </div>
  </div>
</div>
<div class="game-result">
  <p>${result.text}</p>
  <a class="${result.class}" href="./onePlayer-normal.html">Play Again</a>
</div>
<div class="house-picked">
  <p>The house picked</p>
  <div data-result="enemy">
    <div class="game-option" data-game="${enemyPicked}">
      <div>
        <img src="./images/icon-${enemyPicked}.svg" alt="${enemyPicked}">
      </div>
    </div>
  </div>
  <div class="before-pick active"></div>
</div>
  `;
  sectionOpitonPicked.innerHTML = sectionHTML;
}

function generateRandomPick(optionsQauntity) {
  const result = Math.floor(Math.random() * (optionsQauntity.length))
  return optionsQauntity[result];
}

function gameResult(playerPicked, enemyPicked) {
  const res = gameRules(playerPicked, enemyPicked);
  return {
    'win': {text: 'You win', class: 'win'},
    'lose': {text: 'You lose', class: 'lose'},
    'tied': {text: 'You tied', class: 'tied'}
  }[res]
}

function gameRules(player, enemy) {
  let result = '';
  if(player === enemy) {
    result = 'tied';
  } else if(player === 'rock' && enemy === 'scissors' || player === 'rock' && enemy === 'lizard') {
    result = 'win';
  } else if(player === 'paper' && enemy === 'rock' || player === 'paper' && enemy === 'spock') {
    result = 'win';
  } else if(player === 'scissors' && enemy === 'paper' || player === 'scissors' && enemy === 'lizard') {
    result = 'win';
  } else if(player === 'lizard' && enemy === 'paper' || player === 'lizard' && enemy === 'spock') {
    result = 'win';
  } else if(player === 'spock' && enemy === 'scissors' || player === 'spock' && enemy === 'rock') {
    result = 'win';
  } else {
    result = 'lose';
  }
  return result;
}

function showLateEnemyPick(result) {
  const divEnemyPicked = document.querySelector('.house-picked');
  setTimeout(() => {
    divEnemyPicked.classList.add('active');
    showGameResult(result);
  }, 1000);
}

function showGameResult(result) {
  const divGameResult = document.querySelector('.game-result');
  const player = document.querySelector('[data-result="player"]');
  const enemy = document.querySelector('[data-result="enemy"]');
  setTimeout(() => {
    divGameResult.classList.add('active');
    if(result.class === 'win') {
      player.classList.add('winner');
    } else if(result.class === 'lose') {
      enemy.classList.add('winner')
    }
  }, 1000);
}

function updateScore(result) {
  let score = +(getScoreInLocalStorage() ?? 0);
  if(result === 'win') {
    score += 1;
  } else if(result === 'lose') {
    score -= 1;
  }
  localStorage.setItem('score', score);
  scoreHTML.innerText = score;
}

function getScoreInLocalStorage() {
  localStorage.getItem('score');
  return localStorage.getItem('score');
}

updateScore();