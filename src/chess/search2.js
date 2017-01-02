function search2(game, options) {
    options = _.assign({
        history: [],
        depth: 0,
        depthLimitSoft: 2,
        depthLimitHard: undefined,
        alpha: -Infinity,
        beta: Infinity
    }, options);

    if (_.isUndefined(options.depthLimitHard))
        options.depthLimitHard = options.depthLimitSoft + 2;

    var color = game.turn == 'w' ? 1 : -1;

    let moves = [];
    const validMoves = [];

    game.forEachPiece((piece, square) => {
        if (piece.color != game.turn) return;
        moves = moves.concat(game.generatePieceMoves(square));
    });

    for (let i in moves) {
        const move = moves[i];
        const us = game.turn;

        game.move(move);
        const isValid = !game.isKingAttacked(us);

        if (!isValid) {
            game.undo();
            continue;
        }

        // move.score = eval(game) * color;
        move.basicScore = eval2.basic(game) * color;
        validMoves.push(move);
        game.undo();
    }

    // If game is ended
    if (validMoves.length == 0) {
        if (game.isCheck()) {
            return _.assign({score: -Infinity}, options);
        } else {
            return _.assign({score: 0}, options);
        }
    } else if (game.isInsufficientMaterial()) {
        return _.assign({score: 0}, options);
    }

    if (game.isCheck()) {
        options.depthLimitSoft = Math.min(options.depthLimitSoft + 2, options.depthLimitHard);
    }

    if (options.depth >= options.depthLimitSoft)
        return _.assign({score: eval2(game) * color}, options);

    let best = null;

    // TODO: Order by best maybe?
    const sortedValidMoves = _.sortBy(validMoves, move => -1 * move.basicScore);

    for (let i in sortedValidMoves) {
        const move = sortedValidMoves[i];
        game.move(move);

        const newHistory = options.history.slice();
        newHistory.push(move);

        // If move is capture go deeper!

        const result = search2(game, _.assign({}, options, {
            history: newHistory,
            depth: options.depth + 1,
            depthLimitSoft: options.depthLimitSoft,
            depthLimitHard: options.depthLimitHard,
            alpha: options.beta * -1,
            beta: options.alpha * -1
        }));

        game.undo();

        result.score = -1 * result.score;

        if (!best) {
            best = result;
        } else if (result.score > best.score) {
            best = result;
        }

        options.alpha = Math.max(options.alpha, result.score);
        if (options.alpha >= options.beta) break;
    }

    return best;
}


if (typeof module !== 'undefined') module.exports = search2;
