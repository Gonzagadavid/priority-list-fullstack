import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Message from '../../components/Message';
import reducer from '../../redux/reducers';
import renderWithRedux from '../helpers/renderWithRedux';

describe('Verifica a renderização e o funcionamento do compoenete Message', () => {
  beforeEach(cleanup);
  it('verifica se ao não ter message e error no estado, o componente não é renderizado', () => {
    renderWithRedux(
      <Message />,
      { ...reducer, appReducer: { message: '', error: '' } },
    );

    expect(screen.queryByTestId('message')).toBeNull();
  });

  it(`verifica se ao ter mensagem no estado é renderizada e ao clicar no
  botão, a mesma é apagada`, () => {
    const { store } = renderWithRedux(
      <Message />,
      { ...reducer, appReducer: { message: 'Message: Test', error: '' } },
    );

    const message = screen.getByRole('heading', { level: 2 });
    const btnOk = screen.getByRole('button', { name: 'OK' });

    expect(message).toBeInTheDocument();
    expect(btnOk).toBeInTheDocument();

    expect(message).toHaveTextContent('Message: Test');

    userEvent.click(btnOk);

    expect(store.getState().appReducer.message).toBeFalsy();
  });

  it(`verifica se ao ter erro no estado é renderizado e ao clicar no
  botão, o mesmo é apagado`, () => {
    const { store } = renderWithRedux(
      <Message />,
      { ...reducer, appReducer: { message: '', error: 'Error: Test' } },
    );

    const error = screen.getByRole('heading', { level: 2 });
    const btnOk = screen.getByRole('button', { name: 'OK' });

    expect(btnOk).toBeInTheDocument();
    expect(error).toBeInTheDocument();

    userEvent.click(btnOk);

    expect(error).toHaveTextContent('Error: Test');
    expect(store.getState().appReducer.error).toBeFalsy();
  });
});
