import { StatusCodes } from 'http-status-codes';
import { insert } from '../../services/user/index.js';

const post = async (req, res, next) => {
  try {
    const {
      name, lastname, password, email,
    } = req.body;

    const user = await insert({
      name, lastname, password, email,
    });

    res.status(StatusCodes.CREATED).json(user);
  } catch (err) {
    next(err);
  }
};
export default post;
