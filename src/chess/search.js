function search(game, limit, depth) {
    depth = depth || 0;
    var color = game.turn() == 'w' ? 1 : -1;

    if (game.game_over()) {
        if (game.in_draw()) {
            return [0, game, depth];
        } else if (game.in_checkmate()) {
            return [Infinity * color, game, depth];
        }

        debugger;
        throw new Error('Unhandled end game');
    }

    if (depth == limit) return [eval(game) * color, game, depth];

    var moves = game.moves();
    var best = [-Infinity, game, depth];

    moves.forEach(function(move) {
        var newGame = game.clone();
        newGame.move(move);

        var result = search(newGame, limit, depth + 1);
        result[0] = -1 * result[0];
        if (result[0] > best[0]) best = result;
    });

    return best;
}


if (typeof module !== 'undefined') module.exports = search;
