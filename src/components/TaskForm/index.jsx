import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { taskForm } from '../../constants/forms';
import checkFields from '../../functions/checkFields';
import useForm from '../../hooks/useForm';
import { actionTaskForm } from '../../redux/actions/appActions';
import postTask from '../../redux/thunks/postTask';
import ConditionalComponent from '../ConditionalComponent';
import './style.css';

function TaskForm() {
  const [form, setForm, resetForm] = useForm(taskForm);
  const { title, description } = form;
  const checked = checkFields(Object.values(form));
  const dispatch = useDispatch();
  const taskFormState = useSelector((state) => state.appReducer.taskForm);

  const sendTask = () => {
    dispatch(postTask(form));
    resetForm();
  };

  return (
    <ConditionalComponent condition={taskFormState}>

      <div className="TaskForm">
        <div className="form-container">
          <h2>Adicionar nova tarefa</h2>
          <label htmlFor="title">
            Título:
            <input type="text" value={title} name="title" onChange={setForm} />
          </label>
          <label htmlFor="description">
            Descrição:
            <textarea name="description" value={description} onChange={setForm} />
          </label>
          <div className="priority-container">
            <h4>Prioridade:</h4>
            <label htmlFor="priority-1">
              <input type="radio" id="priority-1" value="1" name="priority" onChange={setForm} />
              1 - Urgência
            </label>
            <label htmlFor="priority-2">
              <input type="radio" id="priority-2" value="2" name="priority" onChange={setForm} />
              2 - Urgência Menor
            </label>
            <label htmlFor="priority-3">
              <input type="radio" id="priority-3" value="3" name="priority" onChange={setForm} />
              3 - Menor Urgência
            </label>
            <label htmlFor="priority-4">
              <input type="radio" id="priority-4" value="4" name="priority" onChange={setForm} />
              4 - Sem Urgência
            </label>
          </div>
          <label htmlFor="status">
            Status:
            <select name="status" onChange={setForm}>
              <option value="pending">Pendente</option>
              <option value="inProgress">Em andamento</option>
              <option value="completed">Pronto</option>
            </select>
          </label>
          <div className="btn-container">
            <button type="button" onClick={sendTask} disabled={!checked}>Concluir</button>
            <button type="button" onClick={() => dispatch(actionTaskForm(false))}>Cancelar</button>
          </div>
        </div>
      </div>
    </ConditionalComponent>
  );
}

export default TaskForm;
