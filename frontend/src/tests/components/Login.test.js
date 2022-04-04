import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import renderWithRedux from '../helpers/renderWithRedux';
import Login from '../../components/Login';
import { LOGIN } from '../../redux/thunks/endpoints';
import reducer from '../../redux/reducers';

const userResp = {
  _id: '62081eb30b0ec52d7b7b0b20',
  name: 'Usuario',
  lastname: 'de Teste',
  email: 'usuario@email.com',
  token: 'eyJhb1kpXVCJ9.eyJfaWQiOiIbCI6I0.4mNdfeo7FfHiYi3vZjpk',

};
const user = {
  email: 'usuario@email.com',
  password: '123456',
};

describe('testa a renderização e o funcionamento do componente Login', () => {
  afterEach(cleanup);

  it('verifica a renderização dos componentes', () => {
    renderWithRedux(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/manter-se conectado/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cadastrar' })).toBeInTheDocument();
  });

  it('verifica se o botão "Entrar" inicia desabilitado', () => {
    renderWithRedux(<Login />);
    const btnEntrar = screen.getByRole('button', { name: 'Entrar' });

    expect(btnEntrar).toBeDisabled();
  });

  it('verifica se ao digitar somente o email o botão "Entrar" continua desabilitado', () => {
    renderWithRedux(<Login />);
    const btnEntrar = screen.getByRole('button', { name: 'Entrar' });
    const email = screen.getByLabelText(/email/i);

    expect(btnEntrar).toBeDisabled();

    userEvent.type(email, 'usuario@email.com');
    expect(btnEntrar).toBeDisabled();
  });

  it('verifica se ao digitar somente a senha o botão "Entrar" continua desabilitado', () => {
    renderWithRedux(<Login />);
    const btnEntrar = screen.getByRole('button', { name: 'Entrar' });
    const senha = screen.getByLabelText(/senha/i);

    expect(btnEntrar).toBeDisabled();

    userEvent.type(senha, '123456');
    expect(btnEntrar).toBeDisabled();
  });

  it('verifica se ao digitar um email incorreto e a senha o botão "Entrar" continua desabilitado', () => {
    renderWithRedux(<Login />);
    const btnEntrar = screen.getByRole('button', { name: 'Entrar' });
    const email = screen.getByLabelText(/email/i);
    const senha = screen.getByLabelText(/senha/i);

    expect(btnEntrar).toBeDisabled();

    userEvent.type(email, 'incorretoemail.com');
    userEvent.type(senha, '123456');

    expect(btnEntrar).toBeDisabled();
  });

  it('verifica se ao digitar um email correto e a senha o botão "Entrar" é habilitado', () => {
    renderWithRedux(<Login />);
    const btnEntrar = screen.getByRole('button', { name: 'Entrar' });
    const email = screen.getByLabelText(/email/i);
    const senha = screen.getByLabelText(/senha/i);

    expect(btnEntrar).toBeDisabled();

    userEvent.type(email, 'usuario@email.com');
    userEvent.type(senha, '123456');

    expect(btnEntrar).toBeEnabled();
  });

  it(`verifica se ao digitar um email e a senha corretamente uma requisição 
   post é feita com os dados da pessoa usuária`, async () => {
    renderWithRedux(<Login />);
    axios.post = jest.fn().mockResolvedValue(userResp);
    const btnEntrar = screen.getByRole('button', { name: 'Entrar' });
    const email = screen.getByLabelText(/email/i);
    const senha = screen.getByLabelText(/senha/i);

    expect(btnEntrar).toBeDisabled();

    userEvent.type(email, 'usuario@email.com');
    userEvent.type(senha, '123456');

    expect(btnEntrar).toBeEnabled();

    userEvent.click(btnEntrar);

    expect(axios.post).toBeCalledWith(LOGIN, user);
  });

  it('verifica se ao clicar no botão "Cadastrar" o estado login passa a ter o valor false', () => {
    const appReducer = { login: true };
    const { store } = renderWithRedux(<Login />, { ...reducer, appReducer });
    const btnCadastro = screen.getByRole('button', { name: 'Cadastrar' });

    expect(btnCadastro).toBeInTheDocument();

    expect(store.getState().appReducer.login).toBeTruthy();
    userEvent.click(btnCadastro);

    expect(store.getState().appReducer.login).toBeFalsy();
  });
});
