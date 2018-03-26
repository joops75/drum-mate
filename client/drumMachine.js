import React from 'react';
import { render } from 'react-dom';
import css from '!style-loader!css-loader!sass-loader!./styles/style.sass';
import App from './components/App.js';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store'

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}></Route>
    </Router>
  </Provider>
)

render(router, document.getElementById('drum-machine'));