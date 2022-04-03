import { screen } from '@testing-library/react';
import React from 'react';
import Header from '../../components/Header';
import reducer from '../../redux/reducers';
import renderWithRedux from '../helpers/renderWithRedux';

const STATE = {
  ...reducer,
  userReducer: { name: '', lastname: '' },
  appReducer: { logged: true },
};

describe('Verifica a renderização e o funcionamento do component Header', () => {
  it('verifica se componente é renderizado corretamente', () => {
    renderWithRedux(<Header />);

    const title = screen.getByRole('heading', { level: 1 });

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Lista de Prioridades');
  });

  it('verifica se componente é renderizado corretamente', () => {
    renderWithRedux(<Header />);

    const title = screen.getByRole('heading', { level: 1 });

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Lista de Prioridades');
  });

  it(`verifica se quando o estado de logado está como true o componente
  é renderizado com uma saudação com o nome da pessoa usuária`, () => {
    renderWithRedux(
      <Header />,
      { ...STATE, userReducer: { name: 'Fulano', lastname: 'Silva' } },
    );

    const greet = screen.getByText('Olá, Fulano Silva');
    expect(greet).toBeInTheDocument();
  });

  it(`verifica se quando o estado de logado está como true o botão de sair
  é renderizado`, () => {
    renderWithRedux(
      <Header />,
      { ...STATE, userReducer: { name: 'Fulano', lastname: 'Silva' } },
    );

    const logout = screen.getByText(/sair/i);
    expect(logout).toBeInTheDocument();
  });
});
