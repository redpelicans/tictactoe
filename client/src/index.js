import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import reducers from './reducers';
import initialState from './initialState';

console.log('mounting react app ...');  // eslint-disable-line no-console

const store = createStore(
  reducers,
  initialState,
);

const Root = (
  <Provider store={store}>
    <App />
  </Provider>
);

render(Root, document.getElementById('__TTT__'));
