function search2(game, options) {
    options = _.assign({
        history: [],
        depth: 0,
        depthLimit: 2,
        alpha: -Infinity,
        beta: Infinity,
        i: 0
    }, options);

    var color = game.turn() == 'w' ? 1 : -1;

    if (game.game_over()) {
        if (game.in_draw()) {
            return _.assign({score: 0}, options);
        } else if (game.in_checkmate()) {
            return _.assign({score: -Infinity}, options);
        }

        throw new Error('Unhandled end game');
    }


    if (options.depth == options.depthLimit)
        return _.assign({score: eval(game) * color}, options);

    var moves = game.moves();
    var best = null;

    for (var i in moves) {
        var move = moves[i];
        game.move(move);

        var newHistory = options.history.slice();
        newHistory.push(move);

        var result = search2(game, _.assign({}, options, {
            history: newHistory,
            depth: options.depth + 1,
            depthLimit: options.depthLimit, // TODO: Increase this if critical?
            alpha: options.beta * -1,
            beta: options.alpha * -1,
            i: options.i + 1
        }));

        game.undo();

        if (!result)
            continue;

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
