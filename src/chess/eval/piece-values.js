// var materials = ['p', 'n', 'b', 'r', 'q', 'k'];
var pieceValues = {
    p: 100,
    n: 320,
    b: 330,
    r: 500,
    q: 900,
    k: 20000
};


function evalPieceValues(game) {
    return (pieceValues.p * (game.pieces.p.w.length - game.pieces.p.b.length)) +
        (pieceValues.n * (game.pieces.n.w.length - game.pieces.n.b.length)) +
        (pieceValues.b * (game.pieces.b.w.length - game.pieces.b.b.length)) +
        (pieceValues.r * (game.pieces.r.w.length - game.pieces.r.b.length)) +
        (pieceValues.q * (game.pieces.q.w.length - game.pieces.q.b.length));
}


if (typeof module !== 'undefined') module.exports = evalPieceValues;
