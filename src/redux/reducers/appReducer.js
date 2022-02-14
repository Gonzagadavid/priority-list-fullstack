import { LOGGED, LOGIN_RENDER } from '../actions/appActions';

const INITIAL_STATE = {
  logged: false,
  login: true,
};

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGGED:
      return { ...state, logged: action.state };

    case LOGIN_RENDER:
      return { ...state, login: action.state };

    default: return state;
  }
};

export default appReducer;
