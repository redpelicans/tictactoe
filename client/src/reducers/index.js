import { combineReducers } from 'redux';
import game from './game';
import socket from './socket.js';

export default combineReducers({
  game,
  socket,
});
