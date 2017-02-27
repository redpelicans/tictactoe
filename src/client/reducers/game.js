// import * as checkers from '../helpers/game/checkers';
import R from 'ramda';
import {
  JOINED,
  LEFT,
  YOUR_TURN,
  HIS_TURN,
  PIECE_SET,
  END,
  START,
  REPLAY,
  OTHER_READY,
} from '../../constants/socket';

const putPiece = (state, where) => {
  if (state.winner) return state;
  if (state.board[where]) return state;
  const newBoard = state.board.map((cell, index) => {
    if (index === where && !cell) {
      return state.player.playing;
    }
    return cell;
  });
  const { playing, me, him } = state.player;

  return {
    ...state,
    board: newBoard,
    player: {
      ...state.player,
      playing: playing.name === me.name ? him : me,
    },
  };
};

const addPlayer = (state, me, him, id) => ({
  ...state,
  name: id,
  player: {
    ...state.player,
    me: {
      ...state.player.me,
      name: me.username,
    },
    him: {
      ...state.player.him,
      name: him ? him.username : 'NO PLAYER',
    },
  },
});

const removePlayer = state => ({
  ...state,
  player: {
    ...state.player,
    him: { name: 'NO PLAYER' },
  },
});

const myTurn = state => ({
  ...state,
  player: {
    ...state.player,
    playing: { ...state.player.me },
  },
});

const hisTurn = state => ({
  ...state,
  player: {
    ...state.player,
    playing: { ...state.player.him },
  },
});

const gameEnd = (state, payload) => ({
  ...state,
  winner: payload.winner ? { name: payload.winner.username } : null,
  player: {
    ...state.player,
    me: {
      ...state.player.me,
      isReady: false,
    },
    him: {
      ...state.player.him,
      isReady: false,
    },
  },
  isFinished: !payload.winner,
});

const setHimAsReady = state => ({
  ...state,
  player: {
    ...state.player,
    him: {
      ...state.player.him,
      isReady: true,
    },
  },
});

const setMeAsReady = state => ({
  ...state,
  player: {
    ...state.player,
    me: {
      ...state.player.me,
      isReady: true,
    },
  },
});

export default (state = {}, action) => {
  const { payload } = action;
  switch (action.type) {
    case START:
      return { ...state, board: R.times(() => null, 9), winner: null, isFinished: null };
    case JOINED:
      return addPlayer(state, payload.me, payload.him, payload.id);
    case LEFT:
      return removePlayer(state);
    case YOUR_TURN:
      return myTurn(state);
    case HIS_TURN:
      return hisTurn(state);
    case PIECE_SET:
      return putPiece(state, payload);
    case OTHER_READY:
      return setHimAsReady(state);
    case REPLAY:
      return setMeAsReady(state);
    case END:
      return gameEnd(state, payload);
    default: return state;
  }
};
