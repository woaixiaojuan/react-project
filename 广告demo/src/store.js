import {
  applyMiddleware,
  createStore,
  compose,
} from 'redux';

//import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import reducer from './reducers';

const middleware = applyMiddleware(promise(), thunk);
//const middleware = applyMiddleware(promise(), thunk, logger());
// const middleware = compose(
//   applyMiddleware(promise(), thunk, logger()),
//   window.devToolsExtension ? window.devToolsExtension() : f => f
// );
// export default createStore(reducer, window.devToolsExtension && window.devToolsExtension()
// );
export default createStore(reducer, middleware);
// export default createStore(reducer, compose(
//   middleware,
//   window.devToolsExtension ? window.devToolsExtension() : f => f
// ));
// export default createStore(reducer, initialState, middleware);
