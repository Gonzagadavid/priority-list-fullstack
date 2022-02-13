import { StatusCodes } from 'http-status-codes';
import { remove } from '../../services/task/index.js';

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    await remove(id);

    res.status(StatusCodes.NO_CONTENT).end();
  } catch (err) {
    next(err);
  }
};

export default deleteTask;
