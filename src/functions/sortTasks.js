import processTasks from './processTasks';

const statusList = { completed: 3, inProgress: 2, pending: 1 };

const created = (list) => list.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
const status = (list) => list.sort((a, b) => statusList[a.status] - statusList[b.status]);
const title = (list) => list.sort((a, b) => (a.title > b.title ? 1 : -1));
const priority = (list) => list.sort((a, b) => a.priority - b.priority);

const callbacks = {
  created, status, title, priority,
};

const sortTasks = (taskList, key) => {
  const orderList = [...taskList];
  callbacks[key](orderList);
  return processTasks(orderList);
};

export default sortTasks;
