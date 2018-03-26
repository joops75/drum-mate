import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import rootReducer from './reducers/index';

const defaultState = {
  display: false,
  text: '--',
  set: 1,
  volume: 0.5,
  keys: [0, 0, 0, 0, 0, 0, 0, 0, 0]
};

const enhancers = compose(// used to activate Redux DevTools
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

const store = createStore(rootReducer, defaultState, enhancers);

export const history = syncHistoryWithStore(browserHistory, store);

if (module.hot) {// this is used for the hot-reloading of reducers when they are saved
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default// can't use 'import' statement in a function, so 'require' used instead
    store.replaceReducer(nextRootReducer)
  });
}

export default store;
