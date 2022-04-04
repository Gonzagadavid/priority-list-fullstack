import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initialTaskForm } from '../../constants/forms';
import checkFields from '../../functions/checkFields';
import useForm from '../../hooks/useForm';
import { actionTaskForm } from '../../redux/actions/appActions';
import postTask from '../../redux/thunks/postTask';
import updateTask from '../../redux/thunks/updateTask';
import ConditionalComponent from '../ConditionalComponent';
import './style.css';

function TaskForm() {
  const { taskForm, editTask } = useSelector((state) => state.appReducer);
  const { task } = useSelector((state) => state.taskReducer);
  const [form, setForm, resetForm] = useForm(initialTaskForm);
  const {
    title, description, priority, status, _id,
  } = form;
  const checked = checkFields(Object.values({
    title, description, priority, status,
  }));
  const dispatch = useDispatch();
  const thunk = editTask ? updateTask : postTask;
  const text = editTask ? 'Editar tarefa' : 'Adicionar nova tarefa';
  useEffect(() => {
    if (!editTask) return null;
    return resetForm(task);
  }, [editTask]);

  const sendTask = () => {
    dispatch(thunk({ ...form }, _id));
    resetForm();
  };

  const clearForm = () => {
    dispatch(actionTaskForm(false));
    resetForm();
  };

  return (
    <ConditionalComponent condition={taskForm}>
      <div className="TaskForm">
        <div className="form-container">
          <h2>{text}</h2>
          <label htmlFor="title">
            Título:
            <input type="text" value={title} name="title" onChange={setForm} />
          </label>
          <label htmlFor="description">
            Descrição:
            <textarea name="description" value={description} onChange={setForm} />
          </label>
          <label htmlFor="status">
            Status:
            <select name="status" onChange={setForm} value={status}>
              <option value="pending">Pendente</option>
              <option value="inProgress">Em andamento</option>
              <option value="completed">Pronto</option>
            </select>
          </label>
          <div className="priority-container">
            <h4>Prioridade:</h4>
            <label htmlFor="priority-1">
              <input type="radio" id="priority-1" value="1" name="priority" checked={priority === '1'} onChange={setForm} />
              1 - Urgência
            </label>
            <label htmlFor="priority-2">
              <input type="radio" id="priority-2" value="2" name="priority" checked={priority === '2'} onChange={setForm} />
              2 - Urgência Menor
            </label>
            <label htmlFor="priority-3">
              <input type="radio" id="priority-3" value="3" name="priority" checked={priority === '3'} onChange={setForm} />
              3 - Menor Urgência
            </label>
            <label htmlFor="priority-4">
              <input type="radio" id="priority-4" value="4" name="priority" checked={priority === '4'} onChange={setForm} />
              4 - Sem Urgência
            </label>
          </div>
          <div className="btn-container">
            <button type="button" onClick={sendTask} disabled={!checked}>Concluir</button>
            <button type="button" onClick={clearForm}>Cancelar</button>
          </div>
        </div>
      </div>
    </ConditionalComponent>
  );
}

export default TaskForm;
