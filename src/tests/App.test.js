import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRedux from './helpers/renderWithRedux';

describe('verifica a renderização e o funcionamento do App', () => {
  it('verifica a renderização dos compoentes', () => {
    renderWithRedux(<App />);

    const appTitle = screen.getByRole('heading', { level: 1 });

    expect(appTitle).toBeInTheDocument();
    expect(appTitle).toHaveTextContent('Lista de Prioridades');
  });
});
