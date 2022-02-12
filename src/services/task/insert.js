import TaskModel from '../../models/TaskModel.js';

const Task = new TaskModel();

const insert = async (userId, task) => {
  await Task.insertOne({ userId, ...task, created: new Date() });
};

export default insert;
