var board,
    game = new Chess2(),
    statusEl = $('#status'),
    fenEl = $('#fen'),
    loadFenButtonEl = $('#loadFenButton');

// do not pick up pieces if the game is over
// only pick up pieces for the side to move
var onDragStart = function (source, piece, position, orientation) {
    return true;
    if (game.isGameOver() === true ||
        (game.turn === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn === 'b' && piece.search(/^w/) !== -1)) {
        return false;
    }
};

var onDrop = function (source, target) {
    // see if the move is legal
    var move = game.move_({
        from: Chess2.SQUARES[source],
        to: Chess2.SQUARES[target],
        promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });

    // illegal move
    if (!move) return 'snapback';

    updateStatus();

    if (!game.isGameOver() && game.turn == 'b') {
        setTimeout(function() {
            console.time('search');
            var result = search2(game, {depthLimitSoft: 4, depthLimitHard: 5});
            console.timeEnd('search');
            if (!result) return;
            var move = result.history[0];
            console.log(result, move);
            game.move(move);
            board.position(game.generateFen());
            updateStatus();
        }, 500);
    }

};

// update the board position after the piece snap
// for castling, en passant, pawn promotion
var onSnapEnd = function () {
    board.position(game.generateFen());
};

var updateStatus = function () {
    var status = '';

    var moveColor = 'White';
    if (game.turn === 'b') {
        moveColor = 'Black';
    }

    // checkmate?
    if (game.isCheckmate() === true) {
        status = 'Game over, ' + moveColor + ' is in checkmate.';
    }

    // draw?
    else if (game.isDraw() === true) {
        status = 'Game over, drawn position';
    }

    // game still on
    else {
        status = moveColor + ' to move';

        // check?
        if (game.isCheck() === true) {
            status += ', ' + moveColor + ' is in check';
        }
    }

    statusEl.html(status);
    fenEl.html(game.generateFen());
};

var cfg = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
};
board = ChessBoard('board', cfg);

updateStatus();

loadFenButtonEl.click(function() {
    var fen = prompt('FEN Notation');
    if (!game.load(fen)) return;
    board.position(fen);
    updateStatus();
});
