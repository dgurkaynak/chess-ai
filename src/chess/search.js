function search(game, depth) {
    var color = game.turn() == 'w' ? 1 : -1;

    if (game.game_over()) {
        if (game.in_draw()) {
            return [0, game];
        } else if (game.in_checkmate()) {
            return [Infinity * color, game];
        }

        debugger;
        throw new Error('Unhandled end game');
    }

    if (depth == 0) return [eval(game) * color, game];

    var moves = game.moves();
    var best = [-Infinity, game];

    moves.forEach(function(move) {
        var newGame = game.clone();
        newGame.move(move);

        var result = search(newGame, depth - 1);
        result[0] = -1 * result[0];
        if (result[0] > best[0]) best = result;
    });

    return best;
}
