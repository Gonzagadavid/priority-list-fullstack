import { StatusCodes } from 'http-status-codes';
import { upadate } from '../../services/task/index.js';

const put = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const { id } = req.params;

    const task = await upadate(id, { title, description, status });

    res.status(StatusCodes.OK).json(task);
  } catch (err) {
    next(err);
  }
};

export default put;
