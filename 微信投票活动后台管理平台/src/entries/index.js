import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory, createMemoryHistory } from 'react-router';
import store from '../store';
import Layout from '../layouts/Layout';
import DetailPage from '../pages/DetailPage';
import ZuoPinPage from '../pages/ZuoPinPage';
import '../../node_modules/antd/dist/antd.less';
const app = document.getElementById('app');
const history = createMemoryHistory(location);

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory} >
      <Route path="/" component={Layout}>
        <IndexRoute component= {DetailPage} />
        <Route path="zuoPinPage/:activeId/:mark" name="zuoPinPage" component={ZuoPinPage} />
      </Route>
    </Router>
  </Provider>,
app);
