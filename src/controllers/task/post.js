import { StatusCodes } from 'http-status-codes';
import { TASK_CREATED } from '../../messages/index.js';
import { insert } from '../../services/task/index.js';

const post = async (req, res, next) => {
  try {
    const { task, priority, status } = req.body;
    const { _id } = req.user;

    await insert(_id, { task, priority, status });

    res.status(StatusCodes.CREATED).json(TASK_CREATED);
  } catch (err) {
    next(err);
  }
};
export default post;
