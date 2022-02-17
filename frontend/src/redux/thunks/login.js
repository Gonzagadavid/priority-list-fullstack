import axios from 'axios';
import { actionError, actionlogged } from '../actions/appActions';
import { actionUserData } from '../actions/userReducer';
import { LOGIN } from './endpoints';

const login = (userData, saveCallback) => async (dispatch) => {
  try {
    const { data } = await axios.post(LOGIN, userData);
    saveCallback('todo-user', data);
    dispatch(actionUserData(data));
    dispatch(actionlogged(true));
  } catch (err) {
    const { response: { data: { message } } } = err;
    dispatch(actionError(message));
  }
};

export default login;
