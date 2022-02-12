import { EMAIL_ALREADY_REGISTERED } from '../../errors/index.js';
import UserModel from '../../models/UserModel.js';

const User = new UserModel();

const insert = async (user) => {
  const { email } = user;
  const userExists = await User.findOne({ email });

  if (userExists) throw EMAIL_ALREADY_REGISTERED;

  await User.insertOne(user);
};

export default insert;
