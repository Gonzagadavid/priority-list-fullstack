import { StatusCodes } from 'http-status-codes';
import { check } from '../../services/user/index.js';

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await check({ email, password });

    res.status(StatusCodes.OK).json(user);
  } catch (err) {
    next(err);
  }
};
export default login;
