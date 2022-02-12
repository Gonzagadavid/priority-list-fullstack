import { INVALID_ENTRIES } from '../errors/index.js';
import checkEmail from './helpers/checkEmail.js';
import checkFields from './helpers/checkFields.js';

const validateLogin = (req, _res, next) => {
  const { password, email } = req.body;

  const checked = checkFields([email, password]) && checkEmail(email);

  if (checked) return next();

  return next(INVALID_ENTRIES);
};

export default validateLogin;
