import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRedux from '../helpers/renderWithRedux';
import Signup from '../../components/Signup';

describe('testa a renderização e o funcionamento do componente Login', () => {
  beforeEach(() => {
    renderWithRedux(<Signup />);
  });

  afterEach(cleanup);

  it('verifica a renderização dos componentes', () => {
    expect(screen.getByLabelText(/^nome:$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/sobrenome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^senha:$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirme/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cadastrar' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
  });

  it('verifica se o botão "Entrar" inicia desabilitado', () => {
    const btnCadastrar = screen.getByRole('button', { name: 'Cadastrar' });

    expect(btnCadastrar).toBeDisabled();
  });

  it('verifica se ao digitar somente o email o botão "Cadastrar" continua desabilitado', () => {
    const btnCadastrar = screen.getByRole('button', { name: 'Cadastrar' });
    const email = screen.getByLabelText(/email/i);

    expect(btnCadastrar).toBeDisabled();

    userEvent.type(email, 'usuario@email.com');
    expect(btnCadastrar).toBeDisabled();
  });

  it('verifica se ao digitar somente a senha o botão "Cadastrar" continua desabilitado', () => {
    const btnCadastrar = screen.getByRole('button', { name: 'Cadastrar' });
    const senha = screen.getByLabelText(/^senha:$/i);

    expect(btnCadastrar).toBeDisabled();

    userEvent.type(senha, '123456');
    expect(btnCadastrar).toBeDisabled();
  });

  it('verifica se ao digitar um email incorreto e a senha o botão "Cadastrar" continua desabilitado', () => {
    const btnCadastrar = screen.getByRole('button', { name: 'Cadastrar' });
    const email = screen.getByLabelText(/email/i);
    const senha = screen.getByLabelText(/^senha:$/i);

    expect(btnCadastrar).toBeDisabled();

    userEvent.type(email, 'incorretoemail.com');
    userEvent.type(senha, '123456');

    expect(btnCadastrar).toBeDisabled();
  });

  it('verifica se ao preencher todos campos corretamente o botão "Cadastrar" é habilitado', () => {
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
});
