import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as thunk from 'redux-thunk';
import reducer from '../reducers';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk.default)));

export default store;
