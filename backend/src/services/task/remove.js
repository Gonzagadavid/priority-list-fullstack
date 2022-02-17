import TaskModel from '../../models/TaskModel.js';

const Task = new TaskModel();

const remove = async (id) => {
  await Task.removeTask(id);
};

export default remove;
