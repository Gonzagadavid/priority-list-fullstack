import TaskModel from '../../models/TaskModel.js';

const Task = new TaskModel();

const update = async (id, task) => {
  await Task.updateTask(id, task);

  const taskUpdated = await Task.findTaskById(id);

  return taskUpdated;
};

export default update;
