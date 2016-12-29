function search(game, limit, alpha, beta, depth) {
    depth = depth || 0;
    alpha = alpha || (-Infinity);
    beta = beta || Infinity;

    var color = game.turn() == 'w' ? 1 : -1;

    if (game.game_over()) {
        if (game.in_draw()) {
            return [0, game, depth];
        } else if (game.in_checkmate()) {
            return [-Infinity, game, depth];
        }

        throw new Error('Unhandled end game');
    }

    if (depth == limit) return [eval(game) * color, game, depth];

    var moves = game.moves();
    var best = null;

    for (var i in moves) {
        var newGame = game.clone();
        newGame.move(moves[i]);

        var result = search(newGame, limit, beta * -1, alpha * -1, depth + 1);
        if (!result) continue;
        result[0] = -1 * result[0];

        if (!best) {
            best = result;
        } else if (result[0] > best[0]) {
            best = result;
        }

        alpha = Math.max(alpha, result[0]);
        if (alpha >= beta) break;
    }

    return best;
}


if (typeof module !== 'undefined') module.exports = search;
