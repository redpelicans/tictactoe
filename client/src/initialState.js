const size = 9;

const player1 = {
  name: 'player1',
};

const player2 = {
  name: 'player2',
};

const initialState = {
  game: {
    size,
    board: new Array(size).fill(null),
    player: {
      playing: player1,
      player1,
      player2,
    },
    winner: null,
    isFinished: false,
  },
};

export default initialState;
