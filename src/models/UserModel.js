import DBModel from './DBModel.js';

class UserModel extends DBModel {
  constructor() {
    super('users');
  }
}

export default UserModel;
