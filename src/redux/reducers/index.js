import { combineReducers } from 'redux';
import appReducer from './appReducer';
import userReducer from './userReducer';

const reducer = combineReducers({ appReducer, userReducer });

export default reducer;
