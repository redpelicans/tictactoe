import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import io from 'socket.io-client';
import apiURI from '../apiURI';
import socketMiddleware from '../socketMiddleware';
import reducers from '../reducers';
import initialState from '../initialState';
import {
  JOIN,
  READY,
  JOINED,
} from '../../constants/socket';

const ACTION = 'action';

const logger = createLogger();

const socket = io(apiURI);

const generateStore = (mode) => {
  if (mode && mode.includes('production')) {
    return createStore(
      reducers,
      initialState,
      applyMiddleware(
        socketMiddleware(socket),
        thunkMiddleware,
      )
    );
  }
  return createStore(
    reducers,
    initialState,
    applyMiddleware(
      logger,
      thunkMiddleware,
      socketMiddleware(socket),
    ),
  );
};

const store = generateStore(process.env.NODE_ENV);

if (window.location.hash) {
  // eslint-disable-next-line no-unused-vars
  const [_, id, player] = window.location.hash.match(/^#(\w*)\[(\w*)]/);
  store.dispatch({ type: JOIN, payload: { id, player } });
  socket.on('reconnect', () => {
    store.dispatch({ type: JOIN, payload: { id, player } });
  });
  socket.on(ACTION, ({ type }) => {
    if (type === JOINED) {
      store.dispatch({ type: READY });
    }
  });
}

export default store;
