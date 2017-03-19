/* eslint-disable import/default */

import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
require('./favicon.ico'); // Tell webpack to load favicon.ico
import './styles/index.less'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.

// import { syncHistoryWithStore } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory'

const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
// const history = syncHistoryWithStore(browserHistory, store);
const history = createHistory()

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>, document.getElementById('root')
);
