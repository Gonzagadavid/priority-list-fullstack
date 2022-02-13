import TaskModel from '../../models/TaskModel.js';

const Task = new TaskModel();

const findById = async (id) => {
  const task = await Task.findTaskById(id);

  return task;
};

export default findById;
