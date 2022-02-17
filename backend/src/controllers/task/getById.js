import { StatusCodes } from 'http-status-codes';
import { findById } from '../../services/task/index.js';

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await findById(id);

    res.status(StatusCodes.OK).json(task);
  } catch (err) {
    next(err);
  }
};

export default getById;
