import { screen } from '@testing-library/react';
import React from 'react';
import EntryContainer from '../../components/EntryContainer';
import reducer from '../../redux/reducers';
import renderWithRedux from '../helpers/renderWithRedux';

describe('Verifica a renderização e o funcionamento do componenete EntryContainer', () => {
  it('verifica se quando o estado está como logado o componente não é renderizado', () => {
    renderWithRedux(
      <EntryContainer />,
      { ...reducer, appReducer: { login: false, logged: true } },
    );

    expect(screen.queryByTestId('entry-container')).toBeNull();
  });
  it(`verifica se quando o estado está não como logado e o login acionado, 
  o componente é renderizado como Login `, () => {
    renderWithRedux(
      <EntryContainer />,
      { ...reducer, appReducer: { login: true, logged: false } },
    );

    const login = screen.getByRole('heading', { level: 2 });
    expect(login).toBeInTheDocument();
    expect(login).toHaveTextContent('Entrar');
  });

  it(`verifica se quando o estado está não como logado e o login desativado, 
  o componente é renderizado como Cadastro`, () => {
    renderWithRedux(
      <EntryContainer />,
      { ...reducer, appReducer: { login: false, logged: false } },
    );

    const login = screen.getByRole('heading', { level: 2 });
    expect(login).toBeInTheDocument();
    expect(login).toHaveTextContent('Cadastro');
  });
});
