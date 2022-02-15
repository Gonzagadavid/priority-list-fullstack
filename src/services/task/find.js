import TaskModel from '../../models/TaskModel.js';
import tasksProcessing from './helpers/tasksProcessing.js';

const Task = new TaskModel();

const find = async (userId) => {
  const tasks = await Task.find({ userId });

  return tasksProcessing(tasks);
};

export default find;
