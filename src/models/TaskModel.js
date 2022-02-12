import DBModel from './DBModel.js';

class TaskModel extends DBModel {
  constructor() {
    super('tasks');
  }
}

export default TaskModel;
