import React from 'react';
import { screen } from '@testing-library/react';
import ConditionalComponent from '../../components/ConditionalComponent';
import renderWithRedux from '../helpers/renderWithRedux';

describe('Verifica a renderização e o funcionamento do componente ConditionalComponent', () => {
  it('verifica se ao passar a props condition como true o compenente filho é renderizado', () => {
    renderWithRedux(<ConditionalComponent condition><h1>Test</h1></ConditionalComponent>);
    const childrenComponent = screen.getByRole('heading', { level: 1 });
    expect(childrenComponent).toBeInTheDocument();
    expect(childrenComponent).toHaveTextContent('Test');
  });

  it('verifica se ao passar a props condition como false o compenente filho não é renderizado', () => {
    renderWithRedux(<ConditionalComponent condition={false}><h1>Test</h1></ConditionalComponent>);
    const childrenComponent = screen.queryByRole('heading', { level: 1 });
    expect(childrenComponent).toBeNull();
  });
});
