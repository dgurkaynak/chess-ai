global._ = require('lodash');
global.eval2 = require('../src/chess/eval2');
global.search2 = require('../src/chess/search2');
global.Chess2 = require('../src/chess/chess2');




const tests = [
    { fen: "r3qb1k/1b4p1/p2pr2p/3n4/Pnp1N1N1/6RP/1B3PP1/1B1QR1K1 w - -", result: "Nxh6" },
    { fen: "r4rk1/pp1n1p1p/1nqP2p1/2b1P1B1/4NQ2/1B3P2/PP2K2P/2R5 w - -", result: "Rxc5" },
    { fen: "r2qk2r/ppp1b1pp/2n1p3/3pP1n1/3P2b1/2PB1NN1/PP4PP/R1BQK2R w KQkq -", result: "Nxg5" },
    { fen: "r1b1kb1r/1p1n1ppp/p2ppn2/6BB/2qNP3/2N5/PPP2PPP/R2Q1RK1 w kq -", result: "Nxe6" },
    { fen: "r2qrb1k/1p1b2p1/p2ppn1p/8/3NP3/1BN5/PPP3QP/1K3RR1 w - -", result: "e5" },
    { fen: "rnbqk2r/1p3ppp/p7/1NpPp3/QPP1P1n1/P4N2/4KbPP/R1B2B1R b kq -", result: "axb5" },
    { fen: "1r1bk2r/2R2ppp/p3p3/1b2P2q/4QP2/4N3/1B4PP/3R2K1 w k -", result: "Rxd8+" },
    { fen: "r3rbk1/ppq2ppp/2b1pB2/8/6Q1/1P1B3P/P1P2PP1/R2R2K1 w - -", result: "Bxh7+" },
    { fen: "r4r1k/4bppb/2n1p2p/p1n1P3/1p1p1BNP/3P1NP1/qP2QPB1/2RR2K1 w - -", result: "Ng5" },
    { fen: "r1b2rk1/1p1nbppp/pq1p4/3B4/P2NP3/2N1p3/1PP3PP/R2Q1R1K w - -", result: "Rxf7" },
    { fen: "r1b3k1/p2p1nP1/2pqr1Rp/1p2p2P/2B1PnQ1/1P6/P1PP4/1K4R1 w - -", result: "Rxh6" },
];

console.time('tests');

_.forEach(tests, (test, i) => {
    const game = new Chess2();
    game.loadFen(test.fen);
    const start = new Date().getTime();
    const result = search2(game, {depthLimitSoft: 4});
    const duration = new Date().getTime() - start;

    console.log(`${i+1}) Best move: ${test.result}`);
    console.log(`    Prediction:`);
    result.history.forEach(move => {
        console.log(`        ${move.color} ${move.piece} ${Chess2.algebraic(move.from)}->${Chess2.algebraic(move.to)}`);
    });
    console.log(`    Took: ${duration / 1000}s\n`);
});

console.timeEnd('tests');
