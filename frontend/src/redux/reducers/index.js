import { combineReducers } from 'redux';
import appReducer from './appReducer';
import taskReducer from './taskReducer';
import userReducer from './userReducer';

const reducer = combineReducers({ appReducer, userReducer, taskReducer });

export default reducer;
