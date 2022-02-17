import { StatusCodes } from 'http-status-codes';
import { TASK_REMOVED } from '../../messages/index.js';
import { remove } from '../../services/task/index.js';

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    await remove(id);

    res.status(StatusCodes.ACCEPTED).json(TASK_REMOVED);
  } catch (err) {
    next(err);
  }
};

export default deleteTask;
