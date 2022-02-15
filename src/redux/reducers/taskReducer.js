import { ORDER, TASKS } from '../actions/taskAction';

const INITIAL_STATE = {
  tasks: [],
  order: 'ceated',
};

const taskReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TASKS:
      return { ...state, tasks: action.state };

    case ORDER:
      return { ...state, order: action.state };

    default: return state;
  }
};

export default taskReducer;
