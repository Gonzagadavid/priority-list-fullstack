const tasksProcessing = (tasks) => tasks.map(({
  priority, title, status, created, _id,
}) => ({
  priority, title, status, created, _id,
}));

export default tasksProcessing;
