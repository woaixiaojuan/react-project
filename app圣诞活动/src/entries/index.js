import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'babel-polyfill';
import { Router, Route, IndexRoute, hashHistory, createMemoryHistory } from 'react-router';
import store from '../store';
import Layout from '../layouts/Layout';
import IndexPage from '../pages/IndexPage';

const mainWrap = document.getElementById('app');
const history = createMemoryHistory(location);

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory} >
      <Route path="/" component={Layout}>
        <IndexRoute component= {IndexPage} />
      </Route>
    </Router>
  </Provider>,
mainWrap);
