const cluster = require('cluster');

global._ = require('lodash');
global.eval2 = require('../chess/eval2');
global.search2 = require('../chess/search2');
global.Chess2 = require('../chess/chess2');

process.on('message', (msg) => {
    msg = JSON.parse(msg);
    const response = {
        type: 'response'
    };

    const game = new Chess2();

    switch (msg.type) {
        case 'eval':
            game.loadFen(msg.fen);

            response.result = eval2(game);

            process.send(JSON.stringify(response));
            break;
        case 'search':
            game.loadFen(msg.fen);

            response.result = search2(game, {depthLimitSoft: msg.depthLimitSoft, depthLimitHard: msg.depthLimitHard});

            process.send(JSON.stringify(response));
            break;
        default:
            response.err = `Unsupported message type: ${msg.type}`;
            process.send(JSON.stringify(response));
            break;
    };

});
