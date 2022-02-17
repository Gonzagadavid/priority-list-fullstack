import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { priorityColor, priorityList, statusValues } from '../../constants/lists';
import { actionEditTask, actionTaskForm } from '../../redux/actions/appActions';
import removeTask from '../../redux/thunks/removeTask';
import ConditionalComponent from '../ConditionalComponent';
import './style.css';

function TaskDetails() {
  const { task } = useSelector((state) => state.taskReducer);
  const {
    title, description, priority, status, created, updated, _id,
  } = task;
  const dispatch = useDispatch();
  const checkTask = Object.values(task).length;

  const deleteTask = () => { dispatch(removeTask(_id)); };

  const editTask = () => {
    dispatch(actionEditTask(true));
    dispatch(actionTaskForm(true));
  };

  return (
    <div className="TaskDetails">
      <h2>Detalhes da Tarefa</h2>
      <ConditionalComponent condition={!checkTask}>
        <h3>Nenhuma tarefa selecionada</h3>
      </ConditionalComponent>
      <ConditionalComponent condition={!!checkTask}>
        <h3>{title}</h3>
        <div className="priority" style={{ backgroundColor: priorityColor[priority] }}>
          <p>{`${priorityList[priority]} - ${statusValues[status]} `}</p>
        </div>
        <p>{description}</p>
        <p>{`Publicada em ${new Date(created).toLocaleString('pt-Br')}`}</p>
        <p>{`Modificada em ${new Date(updated).toLocaleString('pt-Br')}`}</p>
        <div className="btn-container">
          <button type="button" onClick={editTask}>Editar Tarefa</button>
          <button type="button" onClick={deleteTask}>Remover Tarefa</button>
        </div>
      </ConditionalComponent>
    </div>
  );
}

export default TaskDetails;
