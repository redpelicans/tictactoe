import R from 'ramda';

const size = 9;

const player1 = {
  name: 'player1',
  isReady: false,
};

const player2 = {
  name: 'NO PLAYER',
  isReady: false,
};

const initialState = {
  game: {
    name: 'YOU HAVEN\'T JOINED A GAME YET',
    size,
    board: R.times(() => null, 9),
    player: {
      playing: player1,
      me: player1,
      him: player2,
    },
    winner: null,
    isFinished: false,
  },
};

export default initialState;
