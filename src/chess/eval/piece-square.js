var PST = {p: {}, n: {}, b: {}, r: {}, q: {}, km: {}, ke: {}};

// Pawn
PST.p.w = [
     0,  0,  0,  0,  0,  0,  0,  0, 0,0,0,0,0,0,0,0,
    50, 50, 50, 50, 50, 50, 50, 50, 0,0,0,0,0,0,0,0,
    10, 10, 20, 30, 30, 20, 10, 10, 0,0,0,0,0,0,0,0,
     5,  5, 10, 25, 25, 10,  5,  5, 0,0,0,0,0,0,0,0,
     0,  0,  0, 20, 20,  0,  0,  0, 0,0,0,0,0,0,0,0,
     5, -5,-10,  0,  0,-10, -5,  5, 0,0,0,0,0,0,0,0,
     5, 10, 10,-20,-20, 10, 10,  5, 0,0,0,0,0,0,0,0,
     0,  0,  0,  0,  0,  0,  0,  0, 0,0,0,0,0,0,0,0,
];
PST.p.b = mirrorPST(PST.p.w);

// Knight
PST.n.w = [
    -50,-40,-30,-30,-30,-30,-40,-50, 0,0,0,0,0,0,0,0,
    -40,-20,  0,  0,  0,  0,-20,-40, 0,0,0,0,0,0,0,0,
    -30,  0, 10, 15, 15, 10,  0,-30, 0,0,0,0,0,0,0,0,
    -30,  5, 15, 20, 20, 15,  5,-30, 0,0,0,0,0,0,0,0,
    -30,  0, 15, 20, 20, 15,  0,-30, 0,0,0,0,0,0,0,0,
    -30,  5, 10, 15, 15, 10,  5,-30, 0,0,0,0,0,0,0,0,
    -40,-20,  0,  5,  5,  0,-20,-40, 0,0,0,0,0,0,0,0,
    -50,-40,-30,-30,-30,-30,-40,-50, 0,0,0,0,0,0,0,0,
];
PST.n.b = mirrorPST(PST.n.w);

// Bishop
PST.b.w = [
    -20,-10,-10,-10,-10,-10,-10,-20, 0,0,0,0,0,0,0,0,
    -10,  0,  0,  0,  0,  0,  0,-10, 0,0,0,0,0,0,0,0,
    -10,  0,  5, 10, 10,  5,  0,-10, 0,0,0,0,0,0,0,0,
    -10,  5,  5, 10, 10,  5,  5,-10, 0,0,0,0,0,0,0,0,
    -10,  0, 10, 10, 10, 10,  0,-10, 0,0,0,0,0,0,0,0,
    -10, 10, 10, 10, 10, 10, 10,-10, 0,0,0,0,0,0,0,0,
    -10,  5,  0,  0,  0,  0,  5,-10, 0,0,0,0,0,0,0,0,
    -20,-10,-10,-10,-10,-10,-10,-20, 0,0,0,0,0,0,0,0,
];
PST.b.b = mirrorPST(PST.b.w);

// Rook
PST.r.w = [
     0,  0,  0,  0,  0,  0,  0,  0, 0,0,0,0,0,0,0,0,
     5, 10, 10, 10, 10, 10, 10,  5, 0,0,0,0,0,0,0,0,
    -5,  0,  0,  0,  0,  0,  0, -5, 0,0,0,0,0,0,0,0,
    -5,  0,  0,  0,  0,  0,  0, -5, 0,0,0,0,0,0,0,0,
    -5,  0,  0,  0,  0,  0,  0, -5, 0,0,0,0,0,0,0,0,
    -5,  0,  0,  0,  0,  0,  0, -5, 0,0,0,0,0,0,0,0,
    -5,  0,  0,  0,  0,  0,  0, -5, 0,0,0,0,0,0,0,0,
     0,  0,  0,  5,  5,  0,  0,  0, 0,0,0,0,0,0,0,0,
];
PST.r.b = mirrorPST(PST.r.w);

// Queen
PST.q.w = [
    -20,-10,-10, -5, -5,-10,-10,-20, 0,0,0,0,0,0,0,0,
    -10,  0,  0,  0,  0,  0,  0,-10, 0,0,0,0,0,0,0,0,
    -10,  0,  5,  5,  5,  5,  0,-10, 0,0,0,0,0,0,0,0,
     -5,  0,  5,  5,  5,  5,  0, -5, 0,0,0,0,0,0,0,0,
      0,  0,  5,  5,  5,  5,  0, -5, 0,0,0,0,0,0,0,0,
    -10,  5,  5,  5,  5,  5,  0,-10, 0,0,0,0,0,0,0,0,
    -10,  0,  5,  0,  0,  0,  0,-10, 0,0,0,0,0,0,0,0,
    -20,-10,-10, -5, -5,-10,-10,-20, 0,0,0,0,0,0,0,0,
];
PST.q.b = mirrorPST(PST.q.w);

// King (for middle game)
PST.km.w = [
    -30,-40,-40,-50,-50,-40,-40,-30, 0,0,0,0,0,0,0,0,
    -30,-40,-40,-50,-50,-40,-40,-30, 0,0,0,0,0,0,0,0,
    -30,-40,-40,-50,-50,-40,-40,-30, 0,0,0,0,0,0,0,0,
    -30,-40,-40,-50,-50,-40,-40,-30, 0,0,0,0,0,0,0,0,
    -20,-30,-30,-40,-40,-30,-30,-20, 0,0,0,0,0,0,0,0,
    -10,-20,-20,-20,-20,-20,-20,-10, 0,0,0,0,0,0,0,0,
     20, 20,  0,  0,  0,  0, 20, 20, 0,0,0,0,0,0,0,0,
     20, 30, 10,  0,  0, 10, 30, 20, 0,0,0,0,0,0,0,0,
];
PST.km.b = mirrorPST(PST.km.w);

// King (for end game)
PST.ke.w = [
    -50,-40,-30,-20,-20,-30,-40,-50, 0,0,0,0,0,0,0,0,
    -30,-20,-10,  0,  0,-10,-20,-30, 0,0,0,0,0,0,0,0,
    -30,-10, 20, 30, 30, 20,-10,-30, 0,0,0,0,0,0,0,0,
    -30,-10, 30, 40, 40, 30,-10,-30, 0,0,0,0,0,0,0,0,
    -30,-10, 30, 40, 40, 30,-10,-30, 0,0,0,0,0,0,0,0,
    -30,-10, 20, 30, 30, 20,-10,-30, 0,0,0,0,0,0,0,0,
    -30,-30,  0,  0,  0,  0,-30,-30, 0,0,0,0,0,0,0,0,
    -50,-30,-30,-30,-30,-30,-30,-50, 0,0,0,0,0,0,0,0,
];
PST.ke.b = mirrorPST(PST.ke.w);


function mirrorPST(arr) {
    return _.flatten(_.chunk(arr, 16).reverse());
}


function evalPieceSquare(game) {
    var scores = ['w', 'b'].map((color) => {
        return ['p', 'n', 'b', 'r', 'q', 'k'].reduce((sum, piece) => {
            let squares = game.pieces[piece][color];

            if (piece == 'k') {
                squares = [game.pieces.k[color]];
                piece = 'ke';
            }

            return sum + squares.reduce((sum, square) => {
                return sum + PST[piece][color][square];
            }, 0);
        }, 0);
    });

    return scores[0] - scores[1];
}


if (typeof module !== 'undefined') module.exports = evalPieceSquare;
