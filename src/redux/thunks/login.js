import axios from 'axios';
import { LOGIN } from './endpoints';

const login = (userData, saveCallback) => async () => {
  try {
    const { data } = await axios.post(LOGIN, userData);
    saveCallback('todo-user', data);
    console.log(data);
  } catch (err) {
    const { response: { data: { message } } } = err;
    console.log(message);
  }
};

export default login;
