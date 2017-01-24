/* eslint-disable no-console, no-param-reassign */
import {

} from './actions/server';

const socketMiddleware = socket => (store) => {
  const { onevent } = socket;
  socket.onevent = function handleEvent(packet) {
    const args = packet.data || [];
    onevent.call(this, packet);
    packet.data = ['*'].concat(args);
    onevent.call(this, packet);
  };
  socket.on('*', (event, data) => {
    store.dispatch({ type: event, payload: data });
    console.log(event, data);
  });
  return next => (action) => {
    if (action.type && action.type.match(/^socket\//)) {
      socket.emit(action.type.replace('socket/', ''), action.payload);
    }
    return next(action);
  };
};

export default socketMiddleware;
