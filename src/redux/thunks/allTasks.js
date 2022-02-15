import axios from 'axios';
import getSaveUser from '../../functions/getSaveUser';
import { actionError } from '../actions/appActions';
import { actionTasks } from '../actions/taskAction';
import { GET_TASKS } from './endpoints';

const allTasks = () => async (dispatch) => {
  try {
    const { token: authorization } = getSaveUser();
    const headers = { authorization };
    const { data } = await axios.get(GET_TASKS, { headers });
    dispatch(actionTasks(data.tasks));
  } catch (err) {
    const { response: { data: { message } } } = err;
    dispatch(actionError(message));
  }
};

export default allTasks;
