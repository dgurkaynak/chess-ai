# chess-ai

Medium strength Chess AI implementation in JavaScript.

Avaliable on: [https://deniz.co/chess-ai/](https://deniz.co/chess-ai/)

[![Demo](./demo.gif)](https://deniz.co/chess-ai/)

[Presentation](https://drive.google.com/file/d/0B0RFeAd0sIc6MjZWVGl4QS1nOXM/view?usp=sharing) | [Project Report](https://drive.google.com/file/d/0B0RFeAd0sIc6RzNOaHhRUFdCTnc/view?usp=sharing)

## Method overview

- Search: Traditional minimax with alpha-beta and node ordering. Also un-even tree generation.
- Evaluation features:
    - Piece values
    - Piece value adjustments
    - Piece square tables
    - King's shield
    - Blockages
    - Safe mobility
    - Attack count&weight

## Setup

- Install dependencies with `npm i`
- Start development server `npm start` and open `http://localhost:1234`
- To build run `npm run build`, server `./dist` folder with your favorite webserver.
- To run tests suites:

```
node test/bratko-kopec.js
node test/ccr.js
node test/eigenmann-endgame.js
node test/kaufman.js
node test/lct.js
node test/nolot.js
node test/sbd.js
node test/wac300.js
```

## Thanks

Special thanks to these projects that help me a lot in this.

- [Chess.js](https://github.com/jhlywa/chess.js)
- [Chessboard.js](http://chessboardjs.com/)
- [CPW](https://chessprogramming.wikispaces.com/)
