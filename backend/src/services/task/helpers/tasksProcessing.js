const tasksProcessing = (tasks) => tasks.map(({
  priority, title, status, created, _id,
}) => ({
  _id, title, priority, status, created,
}));

export default tasksProcessing;
