import ReactDOM from 'react-dom';
import root from '../index';

jest.mock('react-dom', () => ({ render: jest.fn() }));

describe('index.js', () => {
  it('verifica se o metodo render de ReactDom é chamado', () => {
    ReactDOM.render(root);
    expect(ReactDOM.render).toHaveBeenCalledWith(root);
  });
});
