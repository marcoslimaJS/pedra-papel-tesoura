export default class GameOnePlayer {
  constructor(gameOptions, sectionForOptions, sectionOpitonPicked, scoreHTML, gameType) {
    this.gameOptions = document.querySelectorAll(gameOptions);
    this.sectionForOptions = document.querySelector(sectionForOptions);
    this.sectionOpitonPicked = document.querySelector(sectionOpitonPicked);
    this.scoreHTML = document.querySelector(scoreHTML);
    this.gameType = gameType;

    this.optionPicked = this.optionPicked.bind(this);
  }

  addEventInGameOptions() {
    this.gameOptions.forEach((option) => {
      option.addEventListener('click', this.optionPicked)
    })
  }
  
  optionPicked(e) {
    e.preventDefault();
    console.log(this)
    this.sectionForOptions.classList.remove('active');
    const playerPicked = e.currentTarget.dataset.game;
    const options = [...this.gameOptions].map(opt => opt.dataset.game);
    const enemyPicked = this.generateRandomPick(options);
    const result = this.gameResult(playerPicked, enemyPicked);
    setTimeout(() => {
      this.updateScore(result.class);
    }, 2000);
    this.addSectionOpitonClicked(playerPicked, enemyPicked, result);
    this.showLateEnemyPick(result);
  }
  
  addSectionOpitonClicked(youPicked, enemyPicked, result) {
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
    <a class="${result.class}" href="./onePlayer-${this.gameType}.html">Play Again</a>
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
    this.sectionOpitonPicked.innerHTML = sectionHTML;
  }
  
  generateRandomPick(optionsQauntity) {
    const result = Math.floor(Math.random() * (optionsQauntity.length))
    return optionsQauntity[result];
  }
  
  gameResult(playerPicked, enemyPicked) {
    const res = this.gameRules(playerPicked, enemyPicked);
    return {
      'win': {text: 'You win', class: 'win'},
      'lose': {text: 'You lose', class: 'lose'},
      'tied': {text: 'You tied', class: 'tied'}
    }[res]
  }
  
  gameRules(player, enemy) {
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
  
  showLateEnemyPick(result) {
    const divEnemyPicked = document.querySelector('.house-picked');
    setTimeout(() => {
      divEnemyPicked.classList.add('active');
      this.showGameResult(result);
    }, 1000);
  }
  
  showGameResult(result) {
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
  
  updateScore(result) {
    let score = +(this.getScoreInLocalStorage() ?? 0);
    if(result === 'win') {
      score += 1;
    } else if(result === 'lose') {
      score -= 1;
    }
    score < 0 ? score = 0 : '';
    localStorage.setItem(`score-${this.gameType}`, score);
    this.scoreHTML.innerText = score;
  }
  
  getScoreInLocalStorage() {
    return localStorage.getItem(`score-${this.gameType}`);
  }
  
  init() {
    if(this.gameOptions.length) {
      this.addEventInGameOptions();
      this.updateScore();
    }
  }
}
