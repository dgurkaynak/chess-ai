global._ = require('lodash');
global.eval2 = require('../src/chess/eval2');
global.search2 = require('../src/chess/search2');
global.Chess2 = require('../src/chess/chess2');




const tests = [
    { fen: "1rbq1rk1/p1b1nppp/1p2p3/8/1B1pN3/P2B4/1P3PPP/2RQ1R1K w - -", result: "Nf6+" },
    { fen: "3r2k1/p2r1p1p/1p2p1p1/q4n2/3P4/PQ5P/1P1RNPP1/3R2K1 b - -", result: "Nxd4" },
    { fen: "3r2k1/1p3ppp/2pq4/p1n5/P6P/1P6/1PB2QP1/1K2R3 w - -", result: "Rd1" },
    { fen: "r1b1r1k1/1ppn1p1p/3pnqp1/8/p1P1P3/5P2/PbNQNBPP/1R2RB1K w - -", result: "Rxb2" },
    { fen: "2r4k/pB4bp/1p4p1/6q1/1P1n4/2N5/P4PPP/2R1Q1K1 b - -", result: "Qxc1" },
    { fen: "r5k1/3n1ppp/1p6/3p1p2/3P1B2/r3P2P/PR3PP1/2R3K1 b - -", result: "Rxa2" },
    { fen: "2r2rk1/1bqnbpp1/1p1ppn1p/pP6/N1P1P3/P2B1N1P/1B2QPP1/R2R2K1 b - -", result: "Bxe4" },
    { fen: "5r1k/6pp/1n2Q3/4p3/8/7P/PP4PK/R1B1q3 b - -", result: "h6" },
    { fen: "r3k2r/pbn2ppp/8/1P1pP3/P1qP4/5B2/3Q1PPP/R3K2R w KQkq -", result: "Be2" },
    { fen: "3r2k1/ppq2pp1/4p2p/3n3P/3N2P1/2P5/PP2QP2/K2R4 b - -", result: "Nxc3" },
    { fen: "q3rn1k/2QR4/pp2pp2/8/P1P5/1P4N1/6n1/6K1 w - -", result: "Nf5" },
    { fen: "6k1/p3q2p/1nr3pB/8/3Q1P2/6P1/PP5P/3R2K1 b - -", result: "Rd6" },
    { fen: "1r4k1/7p/5np1/3p3n/8/2NB4/7P/3N1RK1 w - -", result: "Nxd5" },
    { fen: "1r2r1k1/p4p1p/6pB/q7/8/3Q2P1/PbP2PKP/1R3R2 w - -", result: "Rxb2" },
    { fen: "r2q1r1k/pb3p1p/2n1p2Q/5p2/8/3B2N1/PP3PPP/R3R1K1 w - -", result: "Bxf5" },
    { fen: "8/4p3/p2p4/2pP4/2P1P3/1P4k1/1P1K4/8 w - -", result: "b4" },
    { fen: "1r1q1rk1/p1p2pbp/2pp1np1/6B1/4P3/2NQ4/PPP2PPP/3R1RK1 w - -", result: "e5" },
    { fen: "q4rk1/1n1Qbppp/2p5/1p2p3/1P2P3/2P4P/6P1/2B1NRK1 b - -", result: "Qc8" },
    { fen: "r2q1r1k/1b1nN2p/pp3pp1/8/Q7/PP5P/1BP2RPN/7K w - -", result: "Qxd7" },
    { fen: "8/5p2/pk2p3/4P2p/2b1pP1P/P3P2B/8/7K w - -", result: "Bg4" },
    { fen: "8/2k5/4p3/1nb2p2/2K5/8/6B1/8 w - -", result: "Kxb5" },
    { fen: "1B1b4/7K/1p6/1k6/8/8/8/8 w - -", result: "Ba7" },
    { fen: "rn1q1rk1/1b2bppp/1pn1p3/p2pP3/3P4/P2BBN1P/1P1N1PP1/R2Q1RK1 b - -", result: "Ba6" },
    { fen: "8/p1ppk1p1/2n2p2/8/4B3/2P1KPP1/1P5P/8 w - -", result: "Bxc6" },
    { fen: "8/3nk3/3pp3/1B6/8/3PPP2/4K3/8 w - -", result: "Bxd7" },
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
