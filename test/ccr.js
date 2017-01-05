global._ = require('lodash');
global.eval2 = require('../src/chess/eval2');
global.search2 = require('../src/chess/search2');
global.Chess2 = require('../src/chess/chess2');




const tests = [
    { fen: "rn1qkb1r/pp2pppp/5n2/3p1b2/3P4/2N1P3/PP3PPP/R1BQKBNR w KQkq - 0 1", result: "bm Qb3" },
    { fen: "rn1qkb1r/pp2pppp/5n2/3p1b2/3P4/1QN1P3/PP3PPP/R1B1KBNR b KQkq - 1 1", result: "Bc8" },
    { fen: "r1bqk2r/ppp2ppp/2n5/4P3/2Bp2n1/5N1P/PP1N1PP1/R2Q1RK1 b kq - 1 10", result: "bm Nh6; am Ne5" },
    { fen: "r1bqrnk1/pp2bp1p/2p2np1/3p2B1/3P4/2NBPN2/PPQ2PPP/1R3RK1 w - - 1 12", result: "bm b4" },
    { fen: "rnbqkb1r/ppp1pppp/5n2/8/3PP3/2N5/PP3PPP/R1BQKBNR b KQkq - 3 5", result: "bm e5;" },
    { fen: "rnbq1rk1/pppp1ppp/4pn2/8/1bPP4/P1N5/1PQ1PPPP/R1B1KBNR b KQ - 1 5", result: "bm Bcx3+" },
    { fen: "r4rk1/3nppbp/bq1p1np1/2pP4/8/2N2NPP/PP2PPB1/R1BQR1K1 b - - 1 12", result: "bm Rfb8" },
    { fen: "rn1qkb1r/pb1p1ppp/1p2pn2/2p5/2PP4/5NP1/PP2PPBP/RNBQK2R w KQkq c6 1 6", result: "bm d5" },
    { fen: "r1bq1rk1/1pp2pbp/p1np1np1/3Pp3/2P1P3/2N1BP2/PP4PP/R1NQKB1R b KQ - 1 9", result: "bm Nd4" },
    { fen: "rnbqr1k1/1p3pbp/p2p1np1/2pP4/4P3/2N5/PP1NBPPP/R1BQ1RK1 w - - 1 11", result: "bm a4" },
    { fen: "rnbqkb1r/pppp1ppp/5n2/4p3/4PP2/2N5/PPPP2PP/R1BQKBNR b KQkq f3 1 3", result: "bm d5" },
    { fen: "r1bqk1nr/pppnbppp/3p4/8/2BNP3/8/PPP2PPP/RNBQK2R w KQkq - 2 6", result: "bm Bxf7+" },
    { fen: "rnbq1b1r/ppp2kpp/3p1n2/8/3PP3/8/PPP2PPP/RNBQKB1R b KQ d3 1 5", result: "am Ne4;" },
    { fen: "rnbqkb1r/pppp1ppp/3n4/8/2BQ4/5N2/PPP2PPP/RNB2RK1 b kq - 1 6", result: "am Nxc4" },
    { fen: "r2q1rk1/2p1bppp/p2p1n2/1p2P3/4P1b1/1nP1BN2/PP3PPP/RN1QR1K1 w - - 1 12", result: "bm exf6" },
    { fen: "r1bqkb1r/2pp1ppp/p1n5/1p2p3/3Pn3/1B3N2/PPP2PPP/RNBQ1RK1 b kq - 2 7", result: "bm d5" },
    { fen: "r2qkbnr/2p2pp1/p1pp4/4p2p/4P1b1/5N1P/PPPP1PP1/RNBQ1RK1 w kq - 1 8", result: "am hxg4" },
    { fen: "r1bqkb1r/pp3ppp/2np1n2/4p1B1/3NP3/2N5/PPP2PPP/R2QKB1R w KQkq e6 1 7", result: "bm Bxf6+" },
    { fen: "rn1qk2r/1b2bppp/p2ppn2/1p6/3NP3/1BN5/PPP2PPP/R1BQR1K1 w kq - 5 10", result: "am Bxe6" },
    { fen: "r1b1kb1r/1pqpnppp/p1n1p3/8/3NP3/2N1B3/PPP1BPPP/R2QK2R w KQkq - 3 8", result: "am Ndb5" },
    { fen: "r1bqnr2/pp1ppkbp/4N1p1/n3P3/8/2N1B3/PPP2PPP/R2QK2R b KQ - 2 11", result: "am Kxe6" },
    { fen: "r3kb1r/pp1n1ppp/1q2p3/n2p4/3P1Bb1/2PB1N2/PPQ2PPP/RN2K2R w KQkq - 3 11", result: "bm a4" },
    { fen: "r1bq1rk1/pppnnppp/4p3/3pP3/1b1P4/2NB3N/PPP2PPP/R1BQK2R w KQ - 3 7", result: "bm Bxh7+" },
    { fen: "r2qkbnr/ppp1pp1p/3p2p1/3Pn3/4P1b1/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 2 6", result: "bm Nxe5" },
    { fen: "rn2kb1r/pp2pppp/1qP2n2/8/6b1/1Q6/PP1PPPBP/RNB1K1NR b KQkq - 1 6", result: "am Qxb3" },

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
