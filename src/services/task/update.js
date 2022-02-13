import TaskModel from '../../models/TaskModel.js';

const Task = new TaskModel();

const upadate = async (id, task) => {
  await Task.updateTask(id, task);

  const taskUpadated = await Task.findTaskById(id);

  return taskUpadated;
};

export default upadate;
