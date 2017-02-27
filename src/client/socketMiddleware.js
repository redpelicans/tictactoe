/* eslint-disable no-console, no-param-reassign */

const socketMiddleware = socket => (store) => {
  // const { onevent } = socket;
  // socket.onevent = function handleEvent(packet) {
  //   const args = packet.data || [];
  //   onevent.call(this, packet);
  //   packet.data = ['*'].concat(args);
  //   onevent.call(this, packet);
  // };
  socket.on('action', ({ type, payload }) => {
    store.dispatch({ type, payload });
  });
  return next => (action) => {
    if (action.type && action.type.match(/^socket\//)) {
      socket.emit(action.type, action.payload);
    }
    return next(action);
  };
};

export default socketMiddleware;
