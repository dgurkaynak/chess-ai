function eval(game) {
    var factor = game.turn() == 'w' ? 1 : -1;
    var score = evalPieceValues(game) + evalPieceSquare(game);

    // return score * factor;
    return score;
}

if (typeof exports !== 'undefined') exports = eval;
