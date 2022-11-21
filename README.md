# chess-ai

Medium strength Chess AI implementation in JavaScript.

Available on: [https://deniz.co/chess-ai/](https://deniz.co/chess-ai/)

[![Demo](./demo.gif)](https://deniz.co/chess-ai/)

[Presentation](https://docs.google.com/presentation/d/0B0RFeAd0sIc6MjZWVGl4QS1nOXM/edit?usp=sharing&ouid=100564047032313877516&resourcekey=0-V7NSA6HjNHRjoazid7WxAg&rtpof=true&sd=true) | [Project Report](https://drive.google.com/file/d/0B0RFeAd0sIc6RzNOaHhRUFdCTnc/view?usp=sharing&resourcekey=0-BBCHIfowrM9p4eD0uki44Q)

## Method overview

- Search: Traditional minimax with alpha-beta and node ordering. Also un-even tree generation.
- Evaluation features:
    - [Piece values](https://www.chessprogramming.org/Point_Value#Basic_values)
    - [Piece value adjustments](https://www.chessprogramming.org/Material#Other_Material_Considerations)
    - [Piece square tables](https://www.chessprogramming.org/Piece-Square_Tables)
    - [King's shield](https://www.chessprogramming.org/King_Safety)
    - [Blockages](https://www.chessprogramming.org/Trapped_Pieces)
    - [Safe mobility](https://www.chessprogramming.org/Mobility#Safe_Mobility)
    - [Attack count&weight](https://www.chessprogramming.org/King_Safety#Attacking_King_Zone)

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
- [CPW](https://www.chessprogramming.org/Main_Page)
