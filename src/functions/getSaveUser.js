import { getLocal, getSession } from '../services/storage';

const getSaveUser = () => {
  const userSave = getLocal('todo-user') || getSession('todo-user');

  return userSave;
};

export default getSaveUser;
