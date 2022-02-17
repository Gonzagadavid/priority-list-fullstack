import getSaveUser from '../../functions/getSaveUser';
import { RESET } from '../actions/appActions';
import { USER_DATA } from '../actions/userReducer';

const USER_STATE = {
  name: '',
  lastname: '',
  email: '',
  token: '',
  _id: '',
};

const SAVE = getSaveUser() || {};

const INITIAL_STATE = { ...USER_STATE, ...SAVE };

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_DATA:
      return { ...state, ...action.state };

    case RESET:
      return INITIAL_STATE;

    default: return state;
  }
};

export default userReducer;
