import axios from 'axios';
import { saveSession } from '../../services/storage';
import { actionError, actionlogged } from '../actions/appActions';
import { actionUserData } from '../actions/userReducer';
import { SIGNUP } from './endpoints';

const register = (userData) => async (dispatch) => {
  try {
    const { data } = await axios.post(SIGNUP, userData);
    saveSession('todo-user', data);
    dispatch(actionUserData(data));
    dispatch(actionlogged(true));
  } catch (err) {
    const { response: { data: { message } } } = err;
    dispatch(actionError(message));
  }
};

export default register;
