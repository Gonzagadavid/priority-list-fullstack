import { StatusCodes } from 'http-status-codes';
import { USER_CREATED } from '../../constants/messages.js';
import { insert } from '../../services/user/index.js';

const post = async (req, res, next) => {
  try {
    const { name, password, email } = req.body;

    await insert({ name, password, email });

    res.status(StatusCodes.OK).json(USER_CREATED);
  } catch (err) {
    next(err);
  }
};
export default post;
