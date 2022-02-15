import React from 'react';
import TaskTable from '../TaskTable';
import TaskTools from '../TaskTools';
import './style.css';

function TaskList() {
  return (
    <div className="TaskList">
      <h1>TaskList</h1>
      <TaskTools />
      <TaskTable />
    </div>
  );
}

export default TaskList;
