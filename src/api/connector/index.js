/* eslint-disable no-param-reassign */
import { logerror } from '../util';
import {
  start,
  left,
  joined,
  yourTurn,
  pieceSet,
  otherReady,
  end,
} from './actions';
import {
  JOINED,
  JOIN,
  ERROR,
  READY,
  PUT_PIECE,
  REPLAY,
  START,
  YOUR_TURN,
  PIECE_SET,
  END,
  LEFT,
  ACTION,
} from '../../constants/socket';

const setupSocket = (socket, game, player) => {
  socket.game = game;
  socket.player = player;

  const events = [
    { name: START, cb: start(socket) },
    { name: LEFT, cb: left(socket) },
    { name: JOINED, cb: joined(socket, game, player) },
    { name: YOUR_TURN, cb: yourTurn(socket) },
    { name: PIECE_SET, cb: pieceSet(socket) },
    { name: END, cb: end(socket) },
    { name: READY, cb: otherReady(socket) },
  ];

  socket.onLeave = () => {
    events.forEach(event => game.removeListener(event.name, event.cb));
  };

  events.forEach(event => game.on(event.name, event.cb));
};

const successJoin = socket => ({ game, player }) => {
  socket.emit(ACTION, {
    type: JOINED,
    payload: {
      id: game.id,
      me: player,
      him: game.getOtherPlayer(player),
    },
  });
  setupSocket(socket, game, player);
};

const catchRequest = socket => ({ details }) => {
  socket.emit(ACTION, { type: ERROR, payload: details });
};

const connector = (io, organizer) => {
  io.on('connection', (socket) => {
    socket.on(JOIN, (data) => {
      organizer.joinGame(data)
        .then(successJoin(socket))
        .catch(catchRequest(socket));
    });

    socket.on(READY, () => {
      const { game, player } = socket;
      organizer.setAsReady(game, player)
        .catch(catchRequest(socket));
    });

    socket.on(PUT_PIECE, (index) => {
      const { game, player } = socket;
      organizer.putPiece(game, player, index)
        .catch(catchRequest(socket));
    });

    socket.on(REPLAY, () => {
      const { game, player } = socket;
      organizer.setAsReady(game, player)
      .catch(catchRequest(socket));
    });

    socket.on('disconnect', () => {
      const { game, player } = socket;
      if (socket.onLeave) socket.onLeave();
      organizer.leaveGame(game, player)
        .catch(logerror);
    });
  });
};

export default connector;
