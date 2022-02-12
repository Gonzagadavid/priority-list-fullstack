import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import { UNAUTHORIZED_TOKEN, MISSING_AUTH_TOKEN } from '../errors/index.js';

config();

const { SECRET } = process.env;

const authToken = (req, _res, next) => {
  const { authorization: token } = req.headers;

  if (!token) return next(MISSING_AUTH_TOKEN);

  try {
    const { user } = jwt.verify(token, SECRET);

    if (!user) return next(MISSING_AUTH_TOKEN);

    req.user = user;

    return next();
  } catch (err) {
    return next(UNAUTHORIZED_TOKEN);
  }
};

export default authToken;
