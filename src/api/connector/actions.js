import {
  START,
  LEFT,
  PIECE_SET,
  JOINED,
  YOUR_TURN,
  HIS_TURN,
  OTHER_READY,
  END,
  ACTION,
} from '../../constants/socket';

export const start = socket => () => socket.emit(ACTION, {
  type: START,
});

export const left = socket => () => socket.emit(ACTION, {
  type: LEFT,
});

export const pieceSet = socket => index => socket.emit(ACTION, {
  type: PIECE_SET,
  payload: index,
});

export const joined = (socket, game, player) => () => {
  socket.emit(ACTION, {
    type: JOINED,
    payload: {
      id: game.id,
      me: player,
      him: game.getOtherPlayer(player),
    },
  });
};

export const yourTurn = socket => username => socket.emit(ACTION, {
  type: socket.player.username !== username ? HIS_TURN : YOUR_TURN,
});

export const otherReady = socket => (username) => {
  if (socket.player.username !== username) {
    socket.emit(ACTION, { type: OTHER_READY });
  }
};

export const end = socket => data => socket.emit(ACTION, { type: END, payload: data });
