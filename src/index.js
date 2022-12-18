import chooseModeGame from "./home.js";
import GameOnePlayer from "./onePlayer.js";

chooseModeGame();

const gameOnePlayerNormal = new GameOnePlayer('.normal-1 .game-option', 
'.normal-1 .choose-move','.normal-1 .option-picked', '.normal-1 .score-number', 'normal');
gameOnePlayerNormal.init();

const gameOnePlayerBonus = new GameOnePlayer('.bonus-1 .game-option', 
'.bonus-1 .choose-move','.bonus-1 .option-picked', '.bonus-1 .score-number', 'bonus');
gameOnePlayerBonus.init();