const PIECE_VALUES = {
    k: 0,
    q: 975,
    r: 500,
    b: 335,
    n: 325,
    p: 100
};

// Adjustements of piece values based on the number of own pawns
const KNIGHT_VALUE_ADJUSTMENTS = [-20, -16, -12, -8, -4,  0,  4,  8, 12];
const ROOK_VALUE_ADJUSTMENTS = [15,  12,   9,  6,  3,  0, -3, -6, -9];

const BISHOP_PAIR_BONUS = 30;
const KNIGHT_PAIR_PENALTY = 8;
const ROOK_PAIR_PENALTY = 16;

const KING_BLOCKS_ROOK_PENALTY = 24;
const BLOCK_CENTRAL_PAWN_PENALTY = 24;
const BISHOP_TRAPPED_A7_PENALTY = 150;
const BISHOP_TRAPPED_A6_PENALTY = 50;
const KNIGHT_TRAPPED_A8_PENALTY = 150;
const KNIGHT_TRAPPED_A7_PENALTY = 100;

const C3_KNIGHT_PENALTY = 5;
const NO_FIANCHETTO_PENALTY = 4;

const KING_SHIELD_RANK_2_BONUS = 10;
const KING_SHIELD_RANK_3_BONUS = 5;
const KING_NO_SHIELD_PENALTY = 10;

const ROOK_OPEN_BONUS = 10;
const ROOK_HALF_BONUS = 5;
const RETURNING_BISHOP_BONUS = 20;
const FIANCHETTO_BONUS = 4;

// PSTs
const PAWN_MG_PST = [
     0,   0,   0,   0,   0,   0,   0,   0, 0,0,0,0,0,0,0,0,
    -6,  -4,   1,   1,   1,   1,  -4,  -6, 0,0,0,0,0,0,0,0,
    -6,  -4,   1,   2,   2,   1,  -4,  -6, 0,0,0,0,0,0,0,0,
    -6,  -4,   2,   8,   8,   2,  -4,  -6, 0,0,0,0,0,0,0,0,
    -6,  -4,   5,  10,  10,   5,  -4,  -6, 0,0,0,0,0,0,0,0,
    -4,  -4,   1,   5,   5,   1,  -4,  -4, 0,0,0,0,0,0,0,0,
    -6,  -4,   1, -24,  -24,  1,  -4,  -6, 0,0,0,0,0,0,0,0,
     0,   0,   0,   0,   0,   0,   0,   0, 0,0,0,0,0,0,0,0
];

const PAWN_EG_PST = [
     0,   0,   0,   0,   0,   0,   0,   0, 0,0,0,0,0,0,0,0,
    -6,  -4,   1,   1,   1,   1,  -4,  -6, 0,0,0,0,0,0,0,0,
    -6,  -4,   1,   2,   2,   1,  -4,  -6, 0,0,0,0,0,0,0,0,
    -6,  -4,   2,   8,   8,   2,  -4,  -6, 0,0,0,0,0,0,0,0,
    -6,  -4,   5,  10,  10,   5,  -4,  -6, 0,0,0,0,0,0,0,0,
    -4,  -4,   1,   5,   5,   1,  -4,  -4, 0,0,0,0,0,0,0,0,
    -6,  -4,   1, -24,  -24,  1,  -4,  -6, 0,0,0,0,0,0,0,0,
     0,   0,   0,   0,   0,   0,   0,   0, 0,0,0,0,0,0,0,0
];

const KNIGHT_MG_PST = [
    -8,  -8,  -8,  -8,  -8,  -8,  -8,  -8, 0,0,0,0,0,0,0,0,
    -8,   0,   0,   0,   0,   0,   0,  -8, 0,0,0,0,0,0,0,0,
    -8,   0,   4,   6,   6,   4,   0,  -8, 0,0,0,0,0,0,0,0,
    -8,   0,   6,   8,   8,   6,   0,  -8, 0,0,0,0,0,0,0,0,
    -8,   0,   6,   8,   8,   6,   0,  -8, 0,0,0,0,0,0,0,0,
    -8,   0,   4,   6,   6,   4,   0,  -8, 0,0,0,0,0,0,0,0,
    -8,   0,   1,   2,   2,   1,   0,  -8, 0,0,0,0,0,0,0,0,
   -16, -12,  -8,  -8,  -8,  -8, -12,  -16, 0,0,0,0,0,0,0,0
];

const KNIGHT_EG_PST = [
    -8,  -8,  -8,  -8,  -8,  -8,  -8,  -8, 0,0,0,0,0,0,0,0,
    -8,   0,   0,   0,   0,   0,   0,  -8, 0,0,0,0,0,0,0,0,
    -8,   0,   4,   6,   6,   4,   0,  -8, 0,0,0,0,0,0,0,0,
    -8,   0,   6,   8,   8,   6,   0,  -8, 0,0,0,0,0,0,0,0,
    -8,   0,   6,   8,   8,   6,   0,  -8, 0,0,0,0,0,0,0,0,
    -8,   0,   4,   6,   6,   4,   0,  -8, 0,0,0,0,0,0,0,0,
    -8,   0,   1,   2,   2,   1,   0,  -8, 0,0,0,0,0,0,0,0,
   -16, -12,  -8,  -8,  -8,  -8, -12,  -16, 0,0,0,0,0,0,0,0
];

const BISHOP_MG_PST = [
    -4,  -4,  -4,  -4,  -4,  -4,  -4,  -4, 0,0,0,0,0,0,0,0,
    -4,   0,   0,   0,   0,   0,   0,  -4, 0,0,0,0,0,0,0,0,
    -4,   0,   2,   4,   4,   2,   0,  -4, 0,0,0,0,0,0,0,0,
    -4,   0,   4,   6,   6,   4,   0,  -4, 0,0,0,0,0,0,0,0,
    -4,   0,   4,   6,   6,   4,   0,  -4, 0,0,0,0,0,0,0,0,
    -4,   1,   2,   4,   4,   2,   1,  -4, 0,0,0,0,0,0,0,0,
    -4,   2,   1,   1,   1,   1,   2,  -4, 0,0,0,0,0,0,0,0,
    -4,  -4, -12,  -4,  -4, -12,  -4,  -4, 0,0,0,0,0,0,0,0
];

const BISHOP_EG_PST = [
    -4,  -4,  -4,  -4,  -4,  -4,  -4,  -4, 0,0,0,0,0,0,0,0,
    -4,   0,   0,   0,   0,   0,   0,  -4, 0,0,0,0,0,0,0,0,
    -4,   0,   2,   4,   4,   2,   0,  -4, 0,0,0,0,0,0,0,0,
    -4,   0,   4,   6,   6,   4,   0,  -4, 0,0,0,0,0,0,0,0,
    -4,   0,   4,   6,   6,   4,   0,  -4, 0,0,0,0,0,0,0,0,
    -4,   1,   2,   4,   4,   2,   1,  -4, 0,0,0,0,0,0,0,0,
    -4,   2,   1,   1,   1,   1,   2,  -4, 0,0,0,0,0,0,0,0,
    -4,  -4, -12,  -4,  -4, -12,  -4,  -4, 0,0,0,0,0,0,0,0
];

const ROOK_MG_PST = [
     5,   5,   5,   5,   5,   5,   5,   5, 0,0,0,0,0,0,0,0,
    -5,   0,   0,   0,   0,   0,   0,  -5, 0,0,0,0,0,0,0,0,
    -5,   0,   0,   0,   0,   0,   0,  -5, 0,0,0,0,0,0,0,0,
    -5,   0,   0,   0,   0,   0,   0,  -5, 0,0,0,0,0,0,0,0,
    -5,   0,   0,   0,   0,   0,   0,  -5, 0,0,0,0,0,0,0,0,
    -5,   0,   0,   0,   0,   0,   0,  -5, 0,0,0,0,0,0,0,0,
    -5,   0,   0,   0,   0,   0,   0,  -5, 0,0,0,0,0,0,0,0,
     0,   0,   0,   2,   2,   0,   0,   0, 0,0,0,0,0,0,0,0
];

const ROOK_EG_PST = [
     5,   5,   5,   5,   5,   5,   5,   5, 0,0,0,0,0,0,0,0,
    -5,   0,   0,   0,   0,   0,   0,  -5, 0,0,0,0,0,0,0,0,
    -5,   0,   0,   0,   0,   0,   0,  -5, 0,0,0,0,0,0,0,0,
    -5,   0,   0,   0,   0,   0,   0,  -5, 0,0,0,0,0,0,0,0,
    -5,   0,   0,   0,   0,   0,   0,  -5, 0,0,0,0,0,0,0,0,
    -5,   0,   0,   0,   0,   0,   0,  -5, 0,0,0,0,0,0,0,0,
    -5,   0,   0,   0,   0,   0,   0,  -5, 0,0,0,0,0,0,0,0,
     0,   0,   0,   2,   2,   0,   0,   0, 0,0,0,0,0,0,0,0
];

const QUEEN_MG_PST = [
     0,   0,   0,   0,   0,   0,   0,   0, 0,0,0,0,0,0,0,0,
     0,   0,   1,   1,   1,   1,   0,   0, 0,0,0,0,0,0,0,0,
     0,   0,   1,   2,   2,   1,   0,   0, 0,0,0,0,0,0,0,0,
     0,   0,   2,   3,   3,   2,   0,   0, 0,0,0,0,0,0,0,0,
     0,   0,   2,   3,   3,   2,   0,   0, 0,0,0,0,0,0,0,0,
     0,   0,   1,   2,   2,   1,   0,   0, 0,0,0,0,0,0,0,0,
     0,   0,   1,   1,   1,   1,   0,   0, 0,0,0,0,0,0,0,0,
    -5,  -5,  -5,  -5,  -5,  -5,  -5,  -5, 0,0,0,0,0,0,0,0
];

const QUEEN_EG_PST = [
     0,   0,   0,   0,   0,   0,   0,   0, 0,0,0,0,0,0,0,0,
     0,   0,   1,   1,   1,   1,   0,   0, 0,0,0,0,0,0,0,0,
     0,   0,   1,   2,   2,   1,   0,   0, 0,0,0,0,0,0,0,0,
     0,   0,   2,   3,   3,   2,   0,   0, 0,0,0,0,0,0,0,0,
     0,   0,   2,   3,   3,   2,   0,   0, 0,0,0,0,0,0,0,0,
     0,   0,   1,   2,   2,   1,   0,   0, 0,0,0,0,0,0,0,0,
     0,   0,   1,   1,   1,   1,   0,   0, 0,0,0,0,0,0,0,0,
    -5,  -5,  -5,  -5,  -5,  -5,  -5,  -5, 0,0,0,0,0,0,0,0
];

const KING_MG_PST = [
   -40, -30, -50, -70, -70, -50, -30, -40, 0,0,0,0,0,0,0,0,
   -30, -20, -40, -60, -60, -40, -20, -30, 0,0,0,0,0,0,0,0,
   -20, -10, -30, -50, -50, -30, -10, -20, 0,0,0,0,0,0,0,0,
   -10,   0, -20, -40, -40, -20,   0, -10, 0,0,0,0,0,0,0,0,
     0,  10, -10, -30, -30, -10,  10,   0, 0,0,0,0,0,0,0,0,
    10,  20,   0, -20, -20,   0,  20,  10, 0,0,0,0,0,0,0,0,
    30,  40,  20,   0,   0,  20,  40,  30, 0,0,0,0,0,0,0,0,
    40,  50,  30,  10,  10,  30,  50,  40, 0,0,0,0,0,0,0,0
];

const KING_EG_PST = [
   -72, -48, -36, -24, -24, -36, -48, -72, 0,0,0,0,0,0,0,0,
   -48, -24, -12,   0,   0, -12, -24, -48, 0,0,0,0,0,0,0,0,
   -36, -12,   0,  12,  12,   0, -12, -36, 0,0,0,0,0,0,0,0,
   -24,   0,  12,  24,  24,  12,   0, -24, 0,0,0,0,0,0,0,0,
   -24,   0,  12,  24,  24,  12,   0, -24, 0,0,0,0,0,0,0,0,
   -36, -12,   0,  12,  12,   0, -12, -36, 0,0,0,0,0,0,0,0,
   -48, -24, -12,   0,   0, -12, -24, -48, 0,0,0,0,0,0,0,0,
   -72, -48, -36, -24, -24, -36, -48, -72, 0,0,0,0,0,0,0,0
];

const PST = {
    mg: {
        p: {w: PAWN_MG_PST, b: mirrorPST(PAWN_MG_PST)},
        n: {w: KNIGHT_MG_PST, b: mirrorPST(KNIGHT_MG_PST)},
        b: {w: BISHOP_MG_PST, b: mirrorPST(BISHOP_MG_PST)},
        r: {w: ROOK_MG_PST, b: mirrorPST(ROOK_MG_PST)},
        q: {w: QUEEN_MG_PST, b: mirrorPST(QUEEN_MG_PST)},
        k: {w: KING_MG_PST, b: mirrorPST(KING_MG_PST)}
    },
    eg: {
        p: {w: PAWN_EG_PST, b: mirrorPST(PAWN_EG_PST)},
        n: {w: KNIGHT_EG_PST, b: mirrorPST(KNIGHT_EG_PST)},
        b: {w: BISHOP_EG_PST, b: mirrorPST(BISHOP_EG_PST)},
        r: {w: ROOK_EG_PST, b: mirrorPST(ROOK_EG_PST)},
        q: {w: QUEEN_EG_PST, b: mirrorPST(QUEEN_EG_PST)},
        k: {w: KING_EG_PST, b: mirrorPST(KING_EG_PST)}
    }
};


function eval2(game) {
    let result = 0;
    let phase = 0;
    let mgScore = 0;
    let egScore = 0;

    const materials = {w: 0, b: 0};
    const pieceAdjustment = {w: 0, b: 0};
    const mgPSTs = {w: 0, b: 0};
    const egPSTs = {w: 0, b: 0};
    const kingsShield = {w: 0, b: 0};
    const blockages = {w: 0, b: 0};
    const positionalThemes = {w: 0, b: 0};


    /**
     * Foreach piece on the board
     */
    _.forEach(game.pieces, (pieces, pieceType) => {
        ['w', 'b'].forEach(color => {
            const squares = pieceType == 'k' ? [pieces[color]] : pieces[color];

            // Piece values
            const score = squares.length * PIECE_VALUES[pieceType];
            materials[color] += score;

            // Piece value adjustments and pair bonuses
            let adjustment = 0;
            if (pieceType == 'b' && squares.length > 1) {
                adjustment += BISHOP_PAIR_BONUS;
            } else if (pieceType == 'n' || pieceType == 'r') {
                if (squares.length > 1) {
                    const penalty = pieceType == 'n' ? KNIGHT_PAIR_PENALTY : ROOK_PAIR_PENALTY;
                    adjustment -= penalty;
                }

                const pawnCount = game.pieces.p[color].length;
                const adj = pieceType == 'n' ? KNIGHT_VALUE_ADJUSTMENTS : ROOK_VALUE_ADJUSTMENTS;
                adjustment += adj[pawnCount] * squares.length;
            }
            pieceAdjustment[color] += adjustment;

            // PSTs
            squares.forEach(square => {
                mgPSTs[color] += PST.mg[pieceType][color][square];
                egPSTs[color] += PST.eg[pieceType][color][square];
            });

            // Game phase
            if (pieceType == 'n' || pieceType == 'b') {
                phase += 1;
            } else if (pieceType == 'r') {
                phase += 2;
            } else if (pieceType == 'q') {
                phase += 4;
            }
        });
    });


    /**
     * King's shield
     */
    ['w', 'b'].forEach(color => {
        if (Chess2.file(game.pieces.k[color]) > 4) {
            // Squares are for white, we use relativeSquare to convert it to black
            const f2 = game.getPiece(relativeSquare(101, color));
            const g2 = game.getPiece(relativeSquare(102, color));
            const h2 = game.getPiece(relativeSquare(103, color));
            const f3 = game.getPiece(relativeSquare(85, color));
            const g3 = game.getPiece(relativeSquare(86, color));
            const h3 = game.getPiece(relativeSquare(87, color));

            if (f2 && f2.type == 'p' && f2.color == color) kingsShield[color] += KING_SHIELD_RANK_2_BONUS;
            else if (f3 && f3.type == 'p' && f3.color == color) kingsShield[color] += KING_SHIELD_RANK_3_BONUS;

            if (g2 && g2.type == 'p' && g2.color == color) kingsShield[color] += KING_SHIELD_RANK_2_BONUS;
            else if (g3 && g3.type == 'p' && g3.color == color) kingsShield[color] += KING_SHIELD_RANK_3_BONUS;

            if (h2 && h2.type == 'p' && h2.color == color) kingsShield[color] += KING_SHIELD_RANK_2_BONUS;
            else if (h3 && h3.type == 'p' && h3.color == color) kingsShield[color] += KING_SHIELD_RANK_3_BONUS;
        } else if (Chess2.file(game.pieces.k[color]) < 3) {
            const a2 = game.getPiece(relativeSquare(96, color));
            const b2 = game.getPiece(relativeSquare(97, color));
            const c2 = game.getPiece(relativeSquare(98, color));
            const a3 = game.getPiece(relativeSquare(80, color));
            const b3 = game.getPiece(relativeSquare(81, color));
            const c3 = game.getPiece(relativeSquare(82, color));

            if (a2 && a2.type == 'p' && a2.color == color) kingsShield[color] += KING_SHIELD_RANK_2_BONUS;
            else if (a3 && a3.type == 'p' && a3.color == color) kingsShield[color] += KING_SHIELD_RANK_3_BONUS;

            if (b2 && b2.type == 'p' && b2.color == color) kingsShield[color] += KING_SHIELD_RANK_2_BONUS;
            else if (b3 && b3.type == 'p' && b3.color == color) kingsShield[color] += KING_SHIELD_RANK_3_BONUS;

            if (c2 && c2.type == 'p' && c2.color == color) kingsShield[color] += KING_SHIELD_RANK_2_BONUS;
            else if (c3 && c3.type == 'p' && c3.color == color) kingsShield[color] += KING_SHIELD_RANK_3_BONUS;
        }
    });


    /**
     * Blocked pieces
     */
    ['w', 'b'].forEach(color => {
        const us = color;
        const them = Chess2.swap_color(color);

        // Central pawn, hard to develop bishop
        if (game.checkPiece(relativeSquare(114, us), us, 'b') && game.checkPiece(relativeSquare(99, us), us, 'p') && game.getPiece(relativeSquare(83, us))) {
            blockages[us] -= BLOCK_CENTRAL_PAWN_PENALTY;
        }

        if (game.checkPiece(relativeSquare(117, us), us, 'b') && game.checkPiece(relativeSquare(100, us), us, 'p') && game.getPiece(relativeSquare(84, us))) {
            blockages[us] -= BLOCK_CENTRAL_PAWN_PENALTY;
        }

        // Trapped knight
        if (game.checkPiece(relativeSquare(0, us), us, 'n') &&
            (game.checkPiece(relativeSquare(16, us), them, 'p') || game.checkPiece(relativeSquare(18, us), them, 'p'))) {
            blockages[us] -= KNIGHT_TRAPPED_A8_PENALTY;
        }

        if (game.checkPiece(relativeSquare(7, us), us, 'n') &&
            (game.checkPiece(relativeSquare(23, us), them, 'p') || game.checkPiece(relativeSquare(21, us), them, 'p'))) {
            blockages[us] -= KNIGHT_TRAPPED_A8_PENALTY;
        }

        if (game.checkPiece(relativeSquare(16, us), us, 'n') && game.checkPiece(relativeSquare(32, us), them, 'p') && game.checkPiece(relativeSquare(17, us), them, 'p')) {
            blockages[us] -= KNIGHT_TRAPPED_A7_PENALTY;
        }

        if (game.checkPiece(relativeSquare(23, us), us, 'n') && game.checkPiece(relativeSquare(39, us), them, 'p') && game.checkPiece(relativeSquare(22, us), them, 'p')) {
            blockages[us] -= KNIGHT_TRAPPED_A7_PENALTY;
        }

        // Knight blocking queenside pawns
        if (game.checkPiece(relativeSquare(82, us), us, 'n') && game.checkPiece(relativeSquare(98, us), us, 'p') &&
            game.checkPiece(relativeSquare(67, us), us, 'p') && !game.checkPiece(relativeSquare(68, us), us, 'p')) {
            blockages[us] -= C3_KNIGHT_PENALTY;
        }

        // Trapped bishop
        if (game.checkPiece(relativeSquare(16, us), us, 'b') && game.checkPiece(relativeSquare(33, us), them, 'p')) {
            blockages[us] -= BISHOP_TRAPPED_A7_PENALTY;
        }

        if (game.checkPiece(relativeSquare(23, us), us, 'b') && game.checkPiece(relativeSquare(38, us), them, 'p')) {
            blockages[us] -= BISHOP_TRAPPED_A7_PENALTY;
        }

        if (game.checkPiece(relativeSquare(1, us), us, 'b') && game.checkPiece(relativeSquare(18, us), them, 'p')) {
            blockages[us] -= BISHOP_TRAPPED_A7_PENALTY;
        }

        if (game.checkPiece(relativeSquare(6, us), us, 'b') && game.checkPiece(relativeSquare(21, us), them, 'p')) {
            blockages[us] -= BISHOP_TRAPPED_A7_PENALTY;
        }

        if (game.checkPiece(relativeSquare(32, us), us, 'b') && game.checkPiece(relativeSquare(49, us), them, 'p')) {
            blockages[us] -= BISHOP_TRAPPED_A6_PENALTY;
        }

        if (game.checkPiece(relativeSquare(39, us), us, 'b') && game.checkPiece(relativeSquare(54, us), them, 'p')) {
            blockages[us] -= BISHOP_TRAPPED_A6_PENALTY;
        }

        // Bishop at initial sqare that supporting castled king
        if (game.checkPiece(relativeSquare(117, us), us, 'b') && game.checkPiece(relativeSquare(118, us), us, 'k')) {
            positionalThemes[us] += RETURNING_BISHOP_BONUS;
        }

        if (game.checkPiece(relativeSquare(114, us), us, 'b') && game.checkPiece(relativeSquare(113, us), us, 'k')) {
            positionalThemes[us] += RETURNING_BISHOP_BONUS;
        }

        // Uncastled king that blocking rook
        if ((game.checkPiece(relativeSquare(117, us), us, 'k') || game.checkPiece(relativeSquare(118, us), us, 'k')) &&
            (game.checkPiece(relativeSquare(118, us), us, 'r') || game.checkPiece(relativeSquare(119, us), us, 'r'))) {
            blockages[us] -= KING_BLOCKS_ROOK_PENALTY;
        }

        if ((game.checkPiece(relativeSquare(113, us), us, 'k') || game.checkPiece(relativeSquare(114, us), us, 'k')) &&
            (game.checkPiece(relativeSquare(112, us), us, 'r') || game.checkPiece(relativeSquare(113, us), us, 'r'))) {
            blockages[us] -= KING_BLOCKS_ROOK_PENALTY;
        }
    });


    // Calculate result
    phase = Math.min(phase, 24);

    mgScore = materials.w - materials.b + mgPSTs.w - mgPSTs.b;
    egScore = mgScore;

    mgScore += kingsShield.w - kingsShield.b;

    result += ((phase * mgScore) + ((24 - phase) * egScore)) / 24;
    result += pieceAdjustment.w - pieceAdjustment.b;
    result += blockages.w - blockages.b;
    result += positionalThemes.w - positionalThemes.b;

    return result;
}


// Helpers
function mirrorPST(arr) {
    return _.flatten(_.chunk(arr, 16).reverse());
}

const BLACK_INDEXES = _.flatten(_.chunk(_.times(128, i => i), 16).reverse());
function relativeSquare(i, color) {
    if (color == 'w') return i;
    return BLACK_INDEXES[i];
}


if (typeof module !== 'undefined') module.exports = eval2;
