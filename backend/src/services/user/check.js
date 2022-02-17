import { INCORRECT_PASSWORD, USER_NOT_FOUND } from '../../errors/index.js';
import UserModel from '../../models/UserModel.js';
import generateToken from './helpers/generateToken.js';

const User = new UserModel();

const check = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) throw USER_NOT_FOUND;

  const { password: passwordData, ...userData } = user;

  if (password !== passwordData) throw INCORRECT_PASSWORD;

  const token = generateToken(userData);

  return { token, ...userData };
};

export default check;
