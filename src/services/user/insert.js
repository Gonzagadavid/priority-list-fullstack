import { EMAIL_ALREADY_REGISTERED } from '../../errors/index.js';
import UserModel from '../../models/UserModel.js';
import check from './check.js';

const User = new UserModel();

const insert = async (user) => {
  const { email, password } = user;
  const userExists = await User.findOne({ email });

  if (userExists) throw EMAIL_ALREADY_REGISTERED;

  await User.insertOne(user);

  return check({ email, password });
};

export default insert;
