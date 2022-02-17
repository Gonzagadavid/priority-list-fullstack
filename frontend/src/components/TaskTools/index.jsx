import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionTaskForm } from '../../redux/actions/appActions';
import { actionOrder } from '../../redux/actions/taskAction';
import './style.css';

function TaskTools() {
  const { order } = useSelector((state) => state.taskReducer);
  const dispatch = useDispatch();
  const changeOrder = ({ target: { value } }) => {
    dispatch(actionOrder(value));
  };

  return (
    <div className="TaskTools">
      <div className="order">
        <label htmlFor="priority">
          <input type="radio" id="priority" name="order" checked={order === 'priority'} onChange={changeOrder} value="priority" />
          Prioridade
        </label>
        <label htmlFor="title">
          <input type="radio" id="title" name="order" checked={order === 'title'} onChange={changeOrder} value="title" />
          Titulo
        </label>
        <label htmlFor="status">
          <input type="radio" id="status" name="order" checked={order === 'status'} onChange={changeOrder} value="status" />
          Status
        </label>
        <label htmlFor="created">
          <input type="radio" id="created" name="order" checked={order === 'created'} onChange={changeOrder} value="created" />
          Data
        </label>
      </div>
      <button type="button" onClick={() => dispatch(actionTaskForm(true))}>Adicionar Tarefa</button>
    </div>
  );
}

export default TaskTools;
