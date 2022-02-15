import axios from 'axios';
import getSaveUser from '../../functions/getSaveUser';
import { actionError, actionMessage, actionTaskForm } from '../actions/appActions';
import allTasks from './allTasks';
import { GET_TASKS } from './endpoints';

const postTask = (task) => async (dispatch) => {
  try {
    const { token: authorization } = getSaveUser();
    const headers = { authorization };
    await axios.post(GET_TASKS, task, { headers });
    dispatch(actionTaskForm(false));
    dispatch(actionMessage('Tarefa adicionada com sucesso!!'));
    dispatch(allTasks());
  } catch (err) {
    const { response: { data: { message } } } = err;
    dispatch(actionError(message));
  }
};

export default postTask;
