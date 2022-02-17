import { INVALID_ENTRIES } from '../errors/index.js';
import checkFields from './helpers/checkFields.js';

const validateTask = (req, _res, next) => {
  const {
    title, description, priority, status,
  } = req.body;

  const checked = checkFields([title, description, priority, status]);

  if (checked) return next();

  return next(INVALID_ENTRIES);
};

export default validateTask;
