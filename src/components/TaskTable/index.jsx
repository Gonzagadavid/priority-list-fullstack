import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { taskHeaders, taskskeys } from '../../constants/lists';
import allTasks from '../../redux/thunks/allTasks';
import './style.css';

function TaskTable() {
  const { tasks } = useSelector((state) => state.taskReducer);
  const { logged } = useSelector((state) => state.appReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!logged) return null;
    return dispatch(allTasks());
  }, [logged]);

  return (
    <table className="TaskTable">
      <thead>
        <tr>
          {taskHeaders.map((header) => <th key={uuidv4()}>{header}</th>)}
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={uuidv4()}>
            {taskskeys.map((key) => <td key={uuidv4()}>{task[key]}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskTable;
