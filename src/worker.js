import '@babel/polyfill';
import Chess2 from './chess/chess2';
import eval2 from './chess/eval2';
import search2 from './chess/search2';


self.onmessage = function(e) {
    const msg = e.data;

    const game = new Chess2();

    switch (msg.type) {
        case 'eval': {
            game.loadFen(msg.fen);
            const result = eval2(game, {verbose: msg.verbose});
            self.postMessage({ result });
            break;
        }

        case 'search': {
            game.loadFen(msg.fen);

            const result = search2(game, {depthLimitSoft: msg.depthLimitSoft, depthLimitHard: msg.depthLimitHard});
            if (result.score == Infinity) result.score = 'Infinity';
            if (result.score == -Infinity) result.score = '-Infinity';

            self.postMessage({ result });
            break;
        }

        default: {
            const err = `Unsupported message type: ${msg.type}`;
            self.postMessage({ err });
            break;
        }
    };
}
