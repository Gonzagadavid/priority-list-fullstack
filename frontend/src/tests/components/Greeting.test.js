import { screen } from '@testing-library/react';
import React from 'react';
import Greeting from '../../components/Greeting';
import reducer from '../../redux/reducers';
import renderWithRedux from '../helpers/renderWithRedux';

const STATE = {
  ...reducer,
  userReducer: { name: '', lastname: '' },
  appReducer: { logged: true },
};

describe('Verifica a renderização e o funcionamento do componente Greeting', () => {
  it('verifica se quando o estado de logado está como false o componente não renderiza', () => {
    renderWithRedux(<Greeting />, { ...STATE, appReducer: { logged: false } });

    expect(screen.queryByText(/olá,/i)).toBeNull();
  });

  it(`verifica se quando o estado de logado está como true o componente
  é renderizado com uma saudação com o nome da pessoa usuária`, () => {
    renderWithRedux(
      <Greeting />,
      { ...STATE, userReducer: { name: 'Fulano', lastname: 'Silva' } },
    );

    const greet = screen.getByText('Olá, Fulano Silva');
    expect(greet).toBeInTheDocument();
  });

  it(`verifica se quando o estado de logado está como true o botão de sair
  é renderizado`, () => {
    renderWithRedux(
      <Greeting />,
      { ...STATE, userReducer: { name: 'Fulano', lastname: 'Silva' } },
    );

    const logout = screen.getByText(/sair/i);
    expect(logout).toBeInTheDocument();
  });
});
