import { statusValues } from '../constants/lists';

const processTasks = (tasks) => tasks.map((task) => (
  { ...task, created: new Date(task.created).toLocaleDateString('pt-br'), status: statusValues[task.status] }));

export default processTasks;
