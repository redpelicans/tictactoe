/* eslint-disable no-param-reassign */

const setupSocket = (socket, game, player) => {
  socket.game = game;
  socket.player = player;
  game.on('start', () => socket.emit('game:start'));
  game.on('leaved', () => socket.emit('game:leaved'));
  game.on('joined', () => {
    const data = {
      id: game.id,
      me: player,
      him: game.getOtherPlayer(player),
    };
    socket.emit('game:joined', data);
  });
};

const successJoin = socket => ({ game, player }) => {
  socket.emit('game:joined', {
    id: game.id,
    me: player,
    him: game.getOtherPlayer(player),
  });
  setupSocket(socket, game, player);
};

const catchRequest = socket => ({ details }) => {
  socket.emit('game:error', details);
};

const connector = (io, organizer) => {
  io.on('connection', (socket) => {
    socket.on('game:join', (data) => {
      organizer.joinGame(data)
        .then(successJoin(socket))
        .catch(catchRequest(socket));
    });

    socket.on('game:ready', () => {
      const { game, player } = socket;
      organizer.setAsReady(game, player)
        .catch(catchRequest(socket));
    });

    socket.on('disconnect', () => {
      const { game, player } = socket;
      organizer.leaveGame(game, player)
        .then(console.log)
        .catch(console.error);
    });
  });
};

export default connector;
