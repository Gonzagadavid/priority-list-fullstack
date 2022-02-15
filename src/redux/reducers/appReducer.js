import getSaveUser from '../../functions/getSaveUser';
import {
  ERROR, LOGGED, LOGIN_RENDER, MESSAGE, TASK_FORM,
} from '../actions/appActions';

const SAVE = getSaveUser();

const INITIAL_STATE = {
  logged: !!SAVE,
  login: true,
  loading: false,
  error: '',
  message: '',
  taskForm: false,
};

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGGED:
      return { ...state, logged: action.state };

    case LOGIN_RENDER:
      return { ...state, login: action.state };

    case ERROR:
      return { ...state, error: action.state };

    case MESSAGE:
      return { ...state, message: action.state };

    case TASK_FORM:
      return { ...state, taskForm: action.state };

    default: return state;
  }
};

export default appReducer;
