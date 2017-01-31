/* eslint-disable no-param-reassign */
import { loginfo, logerror } from '../util';
import gameEvent from './gameEvent';

const setupSocket = (socket, game, player, events) => {
  socket.game = game;
  socket.player = player;

  events.push({ event: 'start', cb: gameEvent.start(socket) });
  events.push({ event: 'leaved', cb: gameEvent.leaved(socket) });
  events.push({ event: 'joined', cb: gameEvent.joined(socket) });
  events.push({ event: 'your turn', cb: gameEvent.yourTurn(socket) });
  events.push({ event: 'piece set', cb: gameEvent.pieceSet(socket) });
  events.push({ event: 'end', cb: gameEvent.end(socket) });

  events.forEach(listener => game.on(listener.event, listener.cb));
};

const successJoin = (socket, events) => ({ game, player }) => {
  socket.emit('game:joined', {
    id: game.id,
    me: player,
    him: game.getOtherPlayer(player),
  });
  setupSocket(socket, game, player, events);
};

const catchRequest = socket => ({ details }) => {
  socket.emit('game:error', details);
};

const connector = (io, organizer) => {
  io.on('connection', (socket) => {
    const listeners = [];
    socket.on('game:join', (data) => {
      organizer.joinGame(data)
        .then(successJoin(socket, listeners))
        .catch(catchRequest(socket));
    });

    socket.on('game:ready', () => {
      const { game, player } = socket;
      organizer.setAsReady(game, player)
        .catch(catchRequest(socket));
    });

    socket.on('game:put piece', (index) => {
      const { game, player } = socket;
      organizer.putPiece(game, player, index)
        .catch(catchRequest(socket));
    });

    socket.on('disconnect', () => {
      const { game, player } = socket;
      if (game) {
        listeners.forEach(listener => game.removeListener(listener.event, listener.cb));
      }
      organizer.leaveGame(game, player)
        .then(loginfo)
        .catch(logerror);
    });
  });
};

export default connector;
