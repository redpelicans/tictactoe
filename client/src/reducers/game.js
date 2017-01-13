import * as checkers from '../helpers/game/checkers';
import initialState from '../initialState';

const putPiece = (state, where) => {
  if (state.win) return state;
  const newMap = state.map.map((cell, index) => {
    if (index === where && !cell) {
      return state.player.playing;
    } else if (index === where) {
      return -1;
    }
    return cell;
  });

  const shouldNotUpdate = !!newMap.find(cell => cell === -1);
  if (shouldNotUpdate) return state;

  const win = checkers.win(newMap);
  const full = checkers.full(newMap);

  const { playing, playerName1, playerName2 } = state.player;

  return {
    ...state,
    win,
    full,
    map: newMap,
    player: {
      ...state.player,
      playing: playing === playerName1 ? playerName2 : playerName1,
    },
  };
};

export default (state = {}, action) => {
  switch (action.type) {
    case 'PUT_PIECE':
      return putPiece(state, action.payload);
    case 'RESET_MAP':
      return initialState.game;
    default: return state;
  }
};
