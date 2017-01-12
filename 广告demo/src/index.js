import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import store from './store';
import Layout from './pages/Layout';
import Settings from './pages/Settings';


const app = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory} >
      <Route path="/" component={Layout}>
        <IndexRoute component={Settings} />
      </Route>
    </Router>
  </Provider>,
app);

