import getSaveUser from '../../functions/getSaveUser';
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

    default: return state;
  }
};

export default userReducer;
