import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Logout from '../../components/Logout';
import renderWithRedux from '../helpers/renderWithRedux';
import reducer from '../../redux/reducers';

describe('Verifica a renderização e o funcionemento do componente Logout', () => {
  it('verifica se ao clicar no botão o estado logged se torna false', () => {
    const { store } = renderWithRedux(<Logout />, { ...reducer, appReducer: { logged: true } });

    const btnLogout = screen.getByText(/sair/i);

    expect(btnLogout).toBeInTheDocument();

    userEvent.click(btnLogout);

    expect(store.getState().appReducer.logged).toBeFalsy();
  });
});
