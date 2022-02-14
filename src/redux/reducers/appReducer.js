import {
  ERROR, LOGGED, LOGIN_RENDER, MESSAGE,
} from '../actions/appActions';

const INITIAL_STATE = {
  logged: false,
  login: true,
  loading: false,
  error: '',
  message: '',
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

    default: return state;
  }
};

export default appReducer;
