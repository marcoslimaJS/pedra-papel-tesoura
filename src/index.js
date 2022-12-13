// Home
const normalGame = document.querySelector('.normal-game');
const bonusGame = document.querySelector('.bonus-game');
const headGame = document.querySelector('.head-game');
const chooseModeText = document.querySelector('.choose-mode-text');
const logoMain = document.querySelector(".logo-main");
const logoBonus = document.querySelector(".logo-bonus");



const showNormalGame = () => {
  chooseModeText.classList.remove('active');
  headGame.classList.add('active');
  logoMain.classList.add('active');
}

const showBonusGame = () => {
  chooseModeText.classList.remove('active');
  headGame.classList.add('active');
  logoBonus.classList.add('active');
}

const addEventToGameModes = () => {
  normalGame.addEventListener('click', showNormalGame);
  bonusGame.addEventListener('click', showBonusGame);
}
addEventToGameModes();