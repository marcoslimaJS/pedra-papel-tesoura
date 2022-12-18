export default function chooseModeGame() {
  const normalGame = document.querySelector('.normal-game');
  const bonusGame = document.querySelector('.bonus-game');
  const chooseModeSection = document.querySelector('.choose-game-mode');
  const onePlayer = document.querySelector('.one-player');
  
  const showChosenGame = (e) => {
    if(e.currentTarget.dataset.game === 'normal') {
      chooseModeSection.dataset.gameSelected = 'normal';
      onePlayer.href = './onePlayer-normal.html';
    } else if (e.currentTarget.dataset.game === 'bonus') {
      chooseModeSection.dataset.gameSelected = 'bonus';
      onePlayer.href = './onePlayer-bonus.html';
    }
  
    normalGame.removeEventListener('click', showChosenGame);
    bonusGame.removeEventListener('click', showChosenGame);
  }
  
  const addEventToGameModes = () => {
    normalGame.addEventListener('click', showChosenGame);
    bonusGame.addEventListener('click', showChosenGame);
  }
  function init() {
    if(normalGame && bonusGame){
      addEventToGameModes();
    }
  }
  init();
}
