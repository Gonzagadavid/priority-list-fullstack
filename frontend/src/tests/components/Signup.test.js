import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import renderWithRedux from '../helpers/renderWithRedux';
import Signup from '../../components/Signup';
import { SIGNUP } from '../../redux/thunks/endpoints';
import reducer from '../../redux/reducers';

const userResp = {
  _id: '62081eb30b0ec52d7b7b0b20',
  name: 'Usuario',
  lastname: 'de Teste',
  email: 'usuario@email.com',
  token: 'eyJhb1kpXVCJ9.eyJfaWQiOiIbCI6I0.4mNdfeo7FfHiYi3vZjpk',

};
const user = {
  name: 'Usuario',
  lastname: 'de Teste',
  email: 'usuario@email.com',
  password: '123456',
  confirm: '123456',
};

describe('testa a renderização e o funcionamento do componente Login', () => {
  afterEach(cleanup);

  it('verifica a renderização dos componentes', () => {
    renderWithRedux(<Signup />);
    expect(screen.getByLabelText(/^nome:$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/sobrenome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^senha:$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirme/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cadastrar' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
  });

  it('verifica se o botão "Entrar" inicia desabilitado', () => {
    renderWithRedux(<Signup />);
    const btnCadastrar = screen.getByRole('button', { name: 'Cadastrar' });

    expect(btnCadastrar).toBeDisabled();
  });

  it('verifica se ao digitar somente o email o botão "Cadastrar" continua desabilitado', () => {
    renderWithRedux(<Signup />);
    const btnCadastrar = screen.getByRole('button', { name: 'Cadastrar' });
    const email = screen.getByLabelText(/email/i);

    expect(btnCadastrar).toBeDisabled();

    userEvent.type(email, 'usuario@email.com');
    expect(btnCadastrar).toBeDisabled();
  });

  it('verifica se ao digitar somente a senha o botão "Cadastrar" continua desabilitado', () => {
    renderWithRedux(<Signup />);
    const btnCadastrar = screen.getByRole('button', { name: 'Cadastrar' });
    const senha = screen.getByLabelText(/^senha:$/i);

    expect(btnCadastrar).toBeDisabled();

    userEvent.type(senha, '123456');
    expect(btnCadastrar).toBeDisabled();
  });

  it('verifica se ao digitar um email incorreto e a senha o botão "Cadastrar" continua desabilitado', () => {
    renderWithRedux(<Signup />);
    const btnCadastrar = screen.getByRole('button', { name: 'Cadastrar' });
    const email = screen.getByLabelText(/email/i);
    const senha = screen.getByLabelText(/^senha:$/i);

    expect(btnCadastrar).toBeDisabled();

    userEvent.type(email, 'incorretoemail.com');
    userEvent.type(senha, '123456');

    expect(btnCadastrar).toBeDisabled();
  });

  it('verifica se ao preencher todos campos corretamente o botão "Cadastrar" é habilitado', () => {
    renderWithRedux(<Signup />);
    const btnCadastrar = screen.getByRole('button', { name: 'Cadastrar' });
    const email = screen.getByLabelText(/email/i);
    const senha = screen.getByLabelText(/^senha:$/i);
    const nome = screen.getByLabelText(/^nome:$/i);
    const sobrenome = screen.getByLabelText(/sobrenome/i);
    const confirme = screen.getByLabelText(/confirme/i);

    expect(btnCadastrar).toBeDisabled();

    userEvent.type(nome, 'Usuario');
    userEvent.type(sobrenome, 'de Teste');
    userEvent.type(email, 'usuario@email.com');
    userEvent.type(senha, '123456');
    userEvent.type(confirme, '123456');

    expect(btnCadastrar).toBeEnabled();
  });

  it(`verifica se ao preencher todos campos, mas com o confirme diferente do password e clicar 
  no botão "Cadastrar", uma post não é feita`, async () => {
    renderWithRedux(<Signup />);
    axios.post = jest.fn().mockResolvedValue(userResp);
    const btnCadastrar = screen.getByRole('button', { name: 'Cadastrar' });
    const email = screen.getByLabelText(/email/i);
    const senha = screen.getByLabelText(/^senha:$/i);
    const nome = screen.getByLabelText(/^nome:$/i);
    const sobrenome = screen.getByLabelText(/sobrenome/i);
    const confirme = screen.getByLabelText(/confirme/i);

    expect(btnCadastrar).toBeDisabled();

    userEvent.type(nome, 'Usuario');
    userEvent.type(sobrenome, 'de Teste');
    userEvent.type(email, 'usuario@email.com');
    userEvent.type(senha, '123456');
    userEvent.type(confirme, '789123');

    expect(btnCadastrar).toBeEnabled();

    userEvent.click(btnCadastrar);

    expect(axios.post).toBeCalledTimes(0);
  });

  it(`verifica se ao preencher todos campos corretamente e clicar no botão "Cadastrar"
  , uma post é feita com as informações da pessoa usuária`, async () => {
    renderWithRedux(<Signup />);
    axios.post = jest.fn().mockResolvedValue(userResp);
    const btnCadastrar = screen.getByRole('button', { name: 'Cadastrar' });
    const email = screen.getByLabelText(/email/i);
    const senha = screen.getByLabelText(/^senha:$/i);
    const nome = screen.getByLabelText(/^nome:$/i);
    const sobrenome = screen.getByLabelText(/sobrenome/i);
    const confirme = screen.getByLabelText(/confirme/i);

    expect(btnCadastrar).toBeDisabled();

    userEvent.type(nome, 'Usuario');
    userEvent.type(sobrenome, 'de Teste');
    userEvent.type(email, 'usuario@email.com');
    userEvent.type(senha, '123456');
    userEvent.type(confirme, '123456');

    expect(btnCadastrar).toBeEnabled();

    userEvent.click(btnCadastrar);

    expect(axios.post).toBeCalled();
    expect(axios.post).toBeCalledWith(SIGNUP, user);
  });

  it('verifica se ao clicar no botão "Entrar" o estado login passa para valor de verdadeiro', () => {
    const appReducer = { login: false };
    const { store } = renderWithRedux(<Signup />, { ...reducer, appReducer });
    const btnEntrar = screen.getByRole('button', { name: 'Entrar' });

    expect(btnEntrar).toBeInTheDocument();
    expect(store.getState().appReducer.login).toBeFalsy();

    userEvent.click(btnEntrar);

    expect(store.getState().appReducer.login).toBeTruthy();
  });
});
