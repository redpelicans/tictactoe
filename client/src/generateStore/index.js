import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import io from 'socket.io-client';
import apiURI from '../apiURI';
import socketMiddleware from '../socketMiddleware';
import reducers from '../reducers';
import initialState from '../initialState';

const logger = createLogger();

const socket = io(apiURI);

const generateStore = (mode) => {
  if (mode && mode.includes('production')) {
    return createStore(
      reducers,
      initialState,
      applyMiddleware(
        socketMiddleware(socket),
      )
    );
  }
  return createStore(
    reducers,
    initialState,
    applyMiddleware(
      logger,
      socketMiddleware(socket),
    ),
  );
};

const store = generateStore(process.env.NODE_ENV);

if (window.location.hash) {
  // eslint-disable-next-line no-unused-vars
  const [_, id, player] = window.location.hash.match(/^#(\w*)\[(\w*)]/);
  store.dispatch({ type: 'socket/game:join', payload: { id, player } });
}

export default store;
