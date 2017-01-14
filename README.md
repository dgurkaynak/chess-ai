# chess-ai

Medium strength Chess AI implementation with Node.js.

- Search: Traditional minimax with alpha-beta and node ordering. Also un-even tree generation.
- Evaluation features:
    - Piece values
    - Piece value adjustments
    - Piece square tables
    - King's shield
    - Blockages
    - Safe mobility
    - Attack count&weight

## Prerequisites

- Node.js (developed and tested with 6.9.1)
- A modern browser (developed and tested with Chrome 55)

## Setup

- Install dependencies with npm or yarn

  ```bash
  npm i
  # or
  yarn
  ```

- Start backend

  ```bash
  npm start
  ```

- Start frontend

  ```bash
  npm run serve
  ```

  Open `http://localhost:8080/src/client` in your favorite browser

## Thanks

- [Chess.js](https://github.com/jhlywa/chess.js)
- [Chessboard.js](http://chessboardjs.com/)
- [CPW](https://chessprogramming.wikispaces.com/)
