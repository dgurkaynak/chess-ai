const {Chess} = require('../chess/chess');

const game = new Chess();
// console.log(game);
console.log(game.ascii());
console.log(game.moves());
console.log(game.materials());
console.log(game.attacked('w', game.SQUARES.b4));
