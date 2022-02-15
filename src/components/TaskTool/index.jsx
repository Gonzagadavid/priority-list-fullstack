import React from 'react';
import { useDispatch } from 'react-redux';
import { actionOrder } from '../../redux/actions/taskAction';
import './style.css';

function TaskTool() {
  const dispatch = useDispatch();
  const changeOrder = ({ target: { value } }) => {
    dispatch(actionOrder(value));
  };
  return (
    <div className="TaskTool">
      <button type="button" onClick={() => {}}>Adicionar Tarefa</button>
      <div className="order">
        <label htmlFor="priority">
          <input type="radio" id="priority" name="order" onChange={changeOrder} value="priority" />
          Prioridade
        </label>
        <label htmlFor="title">
          <input type="radio" id="title" name="order" onChange={changeOrder} value="title" />
          Titulo
        </label>
        <label htmlFor="status">
          <input type="radio" id="status" name="order" onChange={changeOrder} value="status" />
          Status
        </label>
        <label htmlFor="created">
          <input type="radio" id="created" name="order" onChange={changeOrder} value="created" />
          Data
        </label>
      </div>
    </div>
  );
}

export default TaskTool;
