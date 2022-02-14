import React from 'react';
import TaskDetails from '../TaskDetails';
import TaskList from '../TaskList';
import './style.css';

function TaskContainer() {
  return (
    <div className="TaskContainer">
      <TaskList />
      <TaskDetails />
    </div>
  );
}

export default TaskContainer;
