import { StatusCodes } from 'http-status-codes';
import { upadate } from '../../services/task/index.js';

const put = async (req, res, next) => {
  try {
    const { task, priority, status } = req.body;
    const { id } = req.params;

    const taskUpdated = await upadate(id, { task, priority, status });

    res.status(StatusCodes.OK).json(taskUpdated);
  } catch (err) {
    next(err);
  }
};

export default put;
