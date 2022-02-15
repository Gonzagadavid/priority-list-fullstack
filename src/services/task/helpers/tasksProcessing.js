const tasksProcessing = (tasks) => tasks.map(({
  priority, title, status, created,
}) => ({
  priority, title, status, created,
}));

export default tasksProcessing;
