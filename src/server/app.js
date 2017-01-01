global._ = require('../client/js/lodash');
// global.evalPieceSquare = require('../chess/eval/piece-square');
// global.evalPieceValues = require('../chess/eval/piece-values');
// global.eval = require('../chess/eval');
global.eval2 = require('../chess/eval2');
global.search = require('../chess/search');
global.search2 = require('../chess/search2');
global.Chess2 = require('../chess/chess2');

const game = new Chess2();

console.time('search');
console.log(search2(game, {depthLimitSoft: 4}));
console.timeEnd('search');
