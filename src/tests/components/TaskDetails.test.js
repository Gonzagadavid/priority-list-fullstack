import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import React from 'react';
import TaskDetails from '../../components/TaskDetails';
import reducer from '../../redux/reducers';
import { TASK_BY_ID } from '../../redux/thunks/endpoints';
import renderWithRedux from '../helpers/renderWithRedux';

const task = {
  _id: '620dd3418db477bdc0735663',
  userId: '620dd0ac8db477bdc0735662',
  title: 'Tarefa 1',
  description: 'Descrição da tarefa 1',
  priority: 1,
  status: 'pending',
  created: '2022-02-17T04:46:57.036+00:00',
  updated: '2022-02-17T04:46:57.036+00:00',
};

describe('Verifica a renderização e o funcionamento do componente TaskDetails', () => {
  it('verifica se ao renderizar o componente a tarefa selecionada é renderizada', () => {
    renderWithRedux(<TaskDetails />, { ...reducer, taskReducer: { task } });

    const componentTitle = screen.getByRole('heading', { level: 2 });
    const taskTitle = screen.getByRole('heading', { level: 3 });
    const priorityAndStatus = screen.getByText('Urgência - Pendente');
    const description = screen.getByText('Descrição da tarefa 1');
    const created = screen.getByText('Publicada em 17/02/2022 01:46:57');
    const updated = screen.getByText('Modificada em 17/02/2022 01:46:57');

    expect(componentTitle).toBeInTheDocument();
    expect(taskTitle).toBeInTheDocument();
    expect(priorityAndStatus).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(created).toBeInTheDocument();
    expect(updated).toBeInTheDocument();

    expect(componentTitle).toHaveTextContent('Detalhes da Tarefa');
    expect(taskTitle).toHaveTextContent('Tarefa 1');
  });

  it('verifica se ao clicar em Editar Tarefa, os estados editTask e taskform passam a ser true', () => {
    const { store } = renderWithRedux(
      <TaskDetails />,
      {
        ...reducer,
        taskReducer: { task },
        appReducer: { editTask: false, taskForm: false },
      },
    );

    const editButton = screen.getByRole('button', { name: 'Editar Tarefa' });

    userEvent.click(editButton);

    expect(store.getState().appReducer.editTask).toBeTruthy();
    expect(store.getState().appReducer.taskForm).toBeTruthy();
  });

  it(`verifica se ao clicar em removerTarefa Tarefa, 
   uma requisição delete é feita com o id da tarefa`, () => {
    axios.delete = jest.fn().mockResolvedValue({ message: 'task removed successfully' });
    localStorage.setItem('todo-user', JSON.stringify({ token: '' }));
    renderWithRedux(
      <TaskDetails />,
      {
        ...reducer,
        taskReducer: { task, tasks: [task] },
      },
    );

    const editButton = screen.getByRole('button', { name: 'Remover Tarefa' });

    userEvent.click(editButton);

    expect(axios.delete).toBeCalledWith(TASK_BY_ID(task._id), { headers: { authorization: '' } });
  });
});
