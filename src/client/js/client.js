const game = new Chess2();
let board;
const lineClient = new LineClient('ws://localhost:3000');

const statusEl = $('#status');
const consoleEl = $('#console');
const fenEl = $('#fen');
const evalButtonEl = $('#evalButton');
const searchButtonEl = $('#searchButton');
const loadFenButtonEl = $('#loadFenButton');
const resetButtonEl = $('#resetButton');
const undoButtonEl = $('#undoButton');
const autopilotWhiteCheckboxEl = $('#autopilotWhite');
const autopilotBlackCheckboxEl = $('#autopilotBlack');
const depthLimitSoftEl = $('#depthLimitSoft');
const depthLimitHardEl = $('#depthLimitHard');


function evalServer() {
    consoleEl.text('Evaluating...');
    const startDate = new Date();

    return lineClient
        .send('eval', {fen: game.generateFen()})
        .then((result) => {
            consoleEl.html(`
                Score: ${result} <br/>
                Took: ${(new Date().getTime() - startDate.getTime()) / 1000}s
            `);

            return result;
        });
}


function searchServer() {
    consoleEl.text('Searching...');
    const startDate = new Date();

    return lineClient
        .send('search', {
            fen: game.generateFen(),
            depthLimitSoft: parseInt(depthLimitSoftEl.val(), 10),
            depthLimitHard: parseInt(depthLimitHardEl.val(), 10)
        })
        .then((result) => {
            consoleEl.html(`
                Score: ${result.score}<br/>
                Depth: ${result.depthLimitSoft}<br/>
                Moves: ${result.history.map(move => `${Chess2.algebraic(move.from)} -> ${Chess2.algebraic(move.to)}`).join(', ')}<br/><br/>
                Took: ${(new Date().getTime() - startDate.getTime()) / 1000}s
            `);

            return result;
        });
}


function autopilot() {
    if (game.isGameOver())
        return false;

    searchServer()
        .then((result) => {
            game.move(result.history[0]);
            board.position(game.generateFen());
            updateBoardStatus();
        })
        .catch((err) => {
            consoleEl.html(`
                Error: <br/>
                ${err.message}
            `);
        });

    return true;
}


function updateBoardStatus() {
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
    fenEl.val(game.generateFen());

    if (game.turn == 'w' && autopilotWhiteCheckboxEl[0].checked) {
        autopilot();
    } else if (game.turn == 'b' && autopilotBlackCheckboxEl[0].checked) {
        autopilot();
    }
};

board = ChessBoard('board', {
    draggable: true,
    position: 'start',
    onDragStart: function (source, piece, position, orientation) {
        return true;
        if (game.isGameOver() === true ||
            (game.turn === 'w' && piece.search(/^b/) !== -1) ||
            (game.turn === 'b' && piece.search(/^w/) !== -1)) {
            return false;
        }
    },
    onDrop: function (source, target) {
        // see if the move is legal
        var move = game.move_({
            from: Chess2.SQUARES[source],
            to: Chess2.SQUARES[target],
            promotion: 'q' // NOTE: always promote to a queen for example simplicity
        });

        // illegal move
        if (!move) return 'snapback';

        updateBoardStatus();
    },
    onSnapEnd: function () {
        board.position(game.generateFen());
    }
});


loadFenButtonEl.click(function() {
    var fen = prompt('FEN Notation');
    if (!game.loadFen(fen)) return;
    board.position(fen);
    updateBoardStatus();
});


resetButtonEl.click(function() {
    game.reset();
    board.position(game.generateFen());
    updateBoardStatus();
});

evalButtonEl.click(function() {
    evalServer();
});

searchButtonEl.click(function() {
    searchServer();
});

undoButtonEl.click(function() {
    game.undo();
    board.position(game.generateFen());
    updateBoardStatus();
});

autopilotWhiteCheckboxEl.change(function() {
    if (game.turn == 'w' && autopilotWhiteCheckboxEl[0].checked) {
        autopilot();
    }
});

autopilotBlackCheckboxEl.change(function() {
    if (game.turn == 'b' && autopilotBlackCheckboxEl[0].checked) {
        autopilot();
    }
});


/**
 * Start
 */
lineClient.on('_connected', () => {
    console.log('Socket connected');
});
lineClient.connect();

updateBoardStatus();
