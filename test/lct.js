global._ = require('lodash');
global.eval2 = require('../src/chess/eval2');
global.search2 = require('../src/chess/search2');
global.Chess2 = require('../src/chess/chess2');




const tests = [
    { fen: "r3kb1r/3n1pp1/p6p/2pPp2q/Pp2N3/3B2PP/1PQ2P2/R3K2R w KQkq -", result: "d6" },
    { fen: "1k1r3r/pp2qpp1/3b1n1p/3pNQ2/2pP1P2/2N1P3/PP4PP/1K1RR3 b - -", result: "Bb4" },
    { fen: "r6k/pp4p1/2p1b3/3pP3/7q/P2B3r/1PP2Q1P/2K1R1R1 w - -", result: "Qc5" },
    { fen: "1nr5/2rbkppp/p3p3/Np6/2PRPP2/8/PKP1B1PP/3R4 b - -", result: "e5" },
    { fen: "2r2rk1/1p1bq3/p3p2p/3pPpp1/1P1Q4/P7/2P2PPP/2R1RBK1 b - -", result: "Bb5" },
    { fen: "3r1bk1/p4ppp/Qp2p3/8/1P1B4/Pq2P1P1/2r2P1P/R3R1K1 b - -", result: "e5" },
    { fen: "r1b2r1k/pp2q1pp/2p2p2/2p1n2N/4P3/1PNP2QP/1PP2RP1/5RK1 w - -", result: "Nd1" },
    { fen: "r2qrnk1/pp3ppb/3b1n1p/1Pp1p3/2P1P2N/P5P1/1B1NQPBP/R4RK1 w - -", result: "Bh3" },
    { fen: "5nk1/Q4bpp/5p2/8/P1n1PN2/q4P2/6PP/1R4K1 w - -", result: "Qd4" },
    { fen: "r3k2r/3bbp1p/p1nppp2/5P2/1p1NP3/5NP1/PPPK3P/3R1B1R b kq -", result: "Bf8" },
    { fen: "bn6/1q4n1/1p1p1kp1/2pPp1pp/1PP1P1P1/3N1P1P/4B1K1/2Q2N2 w - -", result: "h4" },
    { fen: "3r2k1/pp2npp1/2rqp2p/8/3PQ3/1BR3P1/PP3P1P/3R2K1 b - -", result: "Rb6" },
    { fen: "1r2r1k1/4ppbp/B5p1/3P4/pp1qPB2/2n2Q1P/P4PP1/4RRK1 b - -", result: "Nxa2" },
    { fen: "r2qkb1r/1b3ppp/p3pn2/1p6/1n1P4/1BN2N2/PP2QPPP/R1BR2K1 w kq -", result: "d5" },
    { fen: "1r4k1/1q2bp2/3p2p1/2pP4/p1N4R/2P2QP1/1P3PK1/8 w - -", result: "Nxd6" },
    { fen: "rn3rk1/pbppq1pp/1p2pb2/4N2Q/3PN3/3B4/PPP2PPP/R3K2R w KQ -", result: "Qxh7+" },
    { fen: "4r1k1/3b1p2/5qp1/1BPpn2p/7n/r3P1N1/2Q1RPPP/1R3NK1 b - -", result: "Qf3" },
    { fen: "2k2b1r/1pq3p1/2p1pp2/p1n1PnNp/2P2B2/2N4P/PP2QPP1/3R2K1 w - -", result: "exf6" },
    { fen: "2r2r2/3qbpkp/p3n1p1/2ppP3/6Q1/1P1B3R/PBP3PP/5R1K w - -", result: "Rxh7+" },
    { fen: "2r1k2r/2pn1pp1/1p3n1p/p3PP2/4q2B/P1P5/2Q1N1PP/R4RK1 w q -", result: "exf6" },
    { fen: "2rr2k1/1b3ppp/pb2p3/1p2P3/1P2BPnq/P1N3P1/1B2Q2P/R4R1K b - -", result: "Rxc3" },
    { fen: "2b1r1k1/r4ppp/p7/2pNP3/4Q3/q6P/2P2PP1/3RR1K1 w - -", result: "Nf6+" },
    { fen: "6k1/5p2/3P2p1/7n/3QPP2/7q/r2N3P/6RK b - -", result: "Rxd2" },
    { fen: "rq2rbk1/6p1/p2p2Pp/1p1Rn3/4PB2/6Q1/PPP1B3/2K3R1 w - -", result: "Bxh6" },
    { fen: "rnbq2k1/p1r2p1p/1p1p1Pp1/1BpPn1N1/P7/2P5/6PP/R1B1QRK1 w - -", result: "Nxh7" },
    { fen: "r2qrb1k/1p1b2p1/p2ppn1p/8/3NP3/1BN5/PPP3QP/1K3RR1 w - -", result: "e5" },
    { fen: "8/1p3pp1/7p/5P1P/2k3P1/8/2K2P2/8 w - -", result: "f6" },
    { fen: "8/pp2r1k1/2p1p3/3pP2p/1P1P1P1P/P5KR/8/8 w - -", result: "f5" },
    { fen: "8/3p4/p1bk3p/Pp6/1Kp1PpPp/2P2P1P/2P5/5B2 b - -", result: "Bxe4" },
    { fen: "5k2/7R/4P2p/5K2/p1r2P1p/8/8/8 b - -", result: "h3; am h5" },
    { fen: "6k1/6p1/7p/P1N5/1r3p2/7P/1b3PP1/3bR1K1 w - -", result: "a6" },
    { fen: "8/3b4/5k2/2pPnp2/1pP4N/pP1B2P1/P3K3/8 b - -", result: "f4" },
    { fen: "6k1/4pp1p/3p2p1/P1pPb3/R7/1r2P1PP/3B1P2/6K1 w - -", result: "Bb4" },
    { fen: "2k5/p7/Pp1p1b2/1P1P1p2/2P2P1p/3K3P/5B2/8 w - -", result: "c5" },
    { fen: "8/5Bp1/4P3/6pP/1b1k1P2/5K2/8/8 w - -", result: "Kg4" },
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
