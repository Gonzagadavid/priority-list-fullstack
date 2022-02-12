import { StatusCodes } from 'http-status-codes';
import { find } from '../../services/task/index.js';

const get = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const tasks = await find(_id);

    res.status(StatusCodes.OK).json({ tasks });
  } catch (err) {
    next(err);
  }
};
export default get;
