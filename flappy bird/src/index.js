import Game from './game';

const canvas = document.getElementById('bird-game');
const game = new Game(canvas);
game.restart();