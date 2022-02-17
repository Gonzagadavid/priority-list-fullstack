import { RESET } from '../actions/appActions';
import { ORDER, TASK, TASKS } from '../actions/taskAction';

const INITIAL_STATE = {
  tasks: [],
  order: 'created',
  task: {},
};

const taskReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TASKS:
      return { ...state, tasks: action.state };

    case ORDER:
      return { ...state, order: action.state };

    case TASK:
      return { ...state, task: action.state };

    case RESET:
      return INITIAL_STATE;

    default: return state;
  }
};

export default taskReducer;
