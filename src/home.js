export default function chooseModeGame() {
  const normalGame = document.querySelector('.normal-game');
  const bonusGame = document.querySelector('.bonus-game');
  const chooseModeSection = document.querySelector('.choose-game-mode');
  const choosePlayers = document.querySelector('.choose-players');
  
  const showChosenGame = (e) => {
    if(e.currentTarget.dataset.game === 'normal') {
      chooseModeSection.dataset.gameSelected = 'normal';
    } else if (e.currentTarget.dataset.game === 'bonus') {
      chooseModeSection.dataset.gameSelected = 'bonus';
    }
  
    normalGame.removeEventListener('click', showChosenGame);
    bonusGame.removeEventListener('click', showChosenGame);
  }
  
  const addEventToGameModes = () => {
    normalGame.addEventListener('click', showChosenGame);
    bonusGame.addEventListener('click', showChosenGame);
  }
  addEventToGameModes();
}
