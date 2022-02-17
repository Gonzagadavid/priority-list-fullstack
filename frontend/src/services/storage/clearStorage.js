import clearSession from './clearSession';
import clearLocal from './clearLocal';

const clearStorage = (key) => {
  clearLocal(key);
  clearSession(key);
};

export default clearStorage;
