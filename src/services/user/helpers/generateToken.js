import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const { SECRET } = process.env;

const generateToken = (userCheck) => {
  const { _id, email } = userCheck;
  const jwtConfig = {
    algorithm: 'HS256',
  };

  const user = {
    _id,
    email,
  };

  const token = jwt.sign({ user }, SECRET, jwtConfig);

  return token;
};

export default generateToken;
