import React from 'react';
import TaskTable from '../TaskTable';
import TaskTool from '../TaskTool';
import './style.css';

function TaskList() {
  return (
    <div className="TaskList">
      <h1>TaskList</h1>
      <TaskTool />
      <TaskTable />
    </div>
  );
}

export default TaskList;
