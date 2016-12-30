global._ = require('../client/js/lodash');
// global.Chess = require('../chess/chess').Chess;
global.evalPieceSquare = require('../chess/eval/piece-square');
global.evalPieceValues = require('../chess/eval/piece-values');
global.eval = require('../chess/eval');
global.search = require('../chess/search');
global.search2 = require('../chess/search2');

const Chess = require('../chess/chess2');
const game = new Chess();

console.time('search');
console.log(search2(game, {depthLimitSoft: 4}));
console.timeEnd('search');
