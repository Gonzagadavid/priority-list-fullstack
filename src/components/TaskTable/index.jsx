import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { taskHeaders, taskskeys } from '../../constants/lists';
import sortTasks from '../../functions/sortTasks';
import allTasks from '../../redux/thunks/allTasks';
import taskById from '../../redux/thunks/taskById';
import './style.css';

function TaskTable() {
  const { tasks, order } = useSelector((state) => state.taskReducer);
  const { logged } = useSelector((state) => state.appReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!logged) return null;
    return dispatch(allTasks());
  }, [logged]);

  return (
    <div className="TaskTable">
      <table>
        <thead>
          <tr>
            {taskHeaders.map((header) => <th key={uuidv4()}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {sortTasks(tasks, order).map((task) => (
            <tr key={uuidv4()} onClick={() => dispatch(taskById(task._id))}>
              {taskskeys.map((key) => <td key={uuidv4()}>{task[key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskTable;
