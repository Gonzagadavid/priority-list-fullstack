import { StatusCodes } from 'http-status-codes';
import { USER_CREATED } from '../../messages/index.js';
import { insert } from '../../services/user/index.js';

const post = async (req, res, next) => {
  try {
    const {
      name, lastname, password, email,
    } = req.body;

    await insert({
      name, lastname, password, email,
    });

    res.status(StatusCodes.CREATED).json(USER_CREATED);
  } catch (err) {
    next(err);
  }
};
export default post;
