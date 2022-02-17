import TaskModel from '../../models/TaskModel.js';

const Task = new TaskModel();

const findById = async (id) => {
  const task = await Task.findTaskById(id);
  const { _id } = task;
  return { ...task, _id };
};

export default findById;
