import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../../redux/reducers';

const getStore = (initialState) => {
  if (initialState) return createStore(reducer, initialState, applyMiddleware(thunk));
  return createStore(reducer, applyMiddleware(thunk));
};

export default getStore;
