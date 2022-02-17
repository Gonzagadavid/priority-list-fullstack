import { INTERNAL_ERROR } from '../errors/index.js';

const error = (err, _req, res, _next) => {
  const errorRes = err.status ? err : INTERNAL_ERROR;
  const { status, message } = errorRes;

  res.status(status).json({ message });
};

export default error;
