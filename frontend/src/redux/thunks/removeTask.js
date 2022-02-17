import axios from 'axios';
import getSaveUser from '../../functions/getSaveUser';
import { actionError } from '../actions/appActions';
import { actionTask } from '../actions/taskAction';
import allTasks from './allTasks';
import { TASK_BY_ID } from './endpoints';

const removeTask = (id) => async (dispatch) => {
  try {
    const { token: authorization } = getSaveUser();
    const headers = { authorization };
    await axios.delete(TASK_BY_ID(id), { headers });
    dispatch(allTasks());
    dispatch(actionTask({}));
  } catch (err) {
    const { response: { data: { message } } } = err;
    dispatch(actionError(message));
  }
};

export default removeTask;
