import axios from 'axios';
import getSaveUser from '../../functions/getSaveUser';
import { actionError } from '../actions/appActions';
import { actionTask } from '../actions/taskAction';
import { TASK_BY_ID } from './endpoints';

const taskById = (id) => async (dispatch) => {
  try {
    const { token: authorization } = getSaveUser();
    const headers = { authorization };
    const { data } = await axios.get(TASK_BY_ID(id), { headers });
    dispatch(actionTask(data));
  } catch (err) {
    const { response: { data: { message } } } = err;
    dispatch(actionError(message));
  }
};

export default taskById;
