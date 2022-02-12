import { INVALID_ENTRIES } from '../errors';
import checkEmail from './helpers/checkEmail';
import checkFields from './helpers/checkFields';

const validateUser = (req, _res, next) => {
  const { name, password, email } = req.body;

  const checked = checkFields([name, email, password]) && checkEmail(email);

  if (checked) return next();

  return next(INVALID_ENTRIES);
};

export default validateUser;
