import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './generateStore';

console.log('mounting react app ...');  // eslint-disable-line no-console

const Root = (
  <Provider store={store}>
    <App />
  </Provider>
);

render(Root, document.getElementById('__TTT__'));
