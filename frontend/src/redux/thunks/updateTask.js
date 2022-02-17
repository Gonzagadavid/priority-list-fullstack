import axios from 'axios';
import getSaveUser from '../../functions/getSaveUser';
import { actionEditTask, actionError, actionTaskForm } from '../actions/appActions';
import allTasks from './allTasks';
import { TASK_BY_ID } from './endpoints';
import taskById from './taskById';

const updateTask = (task, id) => async (dispatch) => {
  try {
    const { token: authorization } = getSaveUser();
    const headers = { authorization };
    await axios.put(TASK_BY_ID(id), task, { headers });
    dispatch(actionEditTask(false));
    dispatch(actionTaskForm(false));
    dispatch(allTasks());
    dispatch(taskById(id));
  } catch (err) {
    const { response: { data: { message } } } = err;
    dispatch(actionError(message));
  }
};

export default updateTask;
