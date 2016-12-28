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
    var materials = game.materials();
    return (pieceValues.p * (materials.w.p.length - materials.b.p.length)) +
        (pieceValues.n * (materials.w.n.length - materials.b.n.length)) +
        (pieceValues.b * (materials.w.b.length - materials.b.b.length)) +
        (pieceValues.r * (materials.w.r.length - materials.b.r.length)) +
        (pieceValues.q * (materials.w.q.length - materials.b.q.length));
}


if (typeof exports !== 'undefined') exports = evalPieceValues;
