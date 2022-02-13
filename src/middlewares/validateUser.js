import { INVALID_ENTRIES } from '../errors/index.js';
import checkEmail from './helpers/checkEmail.js';
import checkFields from './helpers/checkFields.js';

const validateUser = (req, _res, next) => {
  const {
    name, lastname, password, email,
  } = req.body;

  const checked = checkFields([name, lastname, email, password]) && checkEmail(email);

  if (checked) return next();

  return next(INVALID_ENTRIES);
};

export default validateUser;
