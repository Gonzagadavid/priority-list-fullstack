import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRedux from '../helpers/renderWithRedux';
import Login from '../../components/Login';

describe('testa a renderização e o funcionamento do componente Login', () => {
  beforeEach(() => {
    renderWithRedux(<Login />);
  });

  afterEach(cleanup);

  it('verifica a renderização dos componentes', () => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/manter-se conectado/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cadastrar' })).toBeInTheDocument();
  });

  it('verifica se o botão "Entrar" inicia desabilitado', () => {
    const btnEntrar = screen.getByRole('button', { name: 'Entrar' });

    expect(btnEntrar).toBeDisabled();
  });

  it('verifica se ao digitar somente o email o botão "Entrar" continua desabilitado', () => {
    const btnEntrar = screen.getByRole('button', { name: 'Entrar' });
    const email = screen.getByLabelText(/email/i);

    expect(btnEntrar).toBeDisabled();

    userEvent.type(email, 'usuario@email.com');
    expect(btnEntrar).toBeDisabled();
  });

  it('verifica se ao digitar somente a senha o botão "Entrar" continua desabilitado', () => {
    const btnEntrar = screen.getByRole('button', { name: 'Entrar' });
    const senha = screen.getByLabelText(/senha/i);

    expect(btnEntrar).toBeDisabled();

    userEvent.type(senha, '123456');
    expect(btnEntrar).toBeDisabled();
  });

  it('verifica se ao digitar um email incorreto e a senha o botão "Entrar" continua desabilitado', () => {
    const btnEntrar = screen.getByRole('button', { name: 'Entrar' });
    const email = screen.getByLabelText(/email/i);
    const senha = screen.getByLabelText(/senha/i);

    expect(btnEntrar).toBeDisabled();

    userEvent.type(email, 'incorretoemail.com');
    userEvent.type(senha, '123456');

    expect(btnEntrar).toBeDisabled();
  });

  it('verifica se ao digitar um email correto e a senha o botão "Entrar" é habilitado', () => {
    const btnEntrar = screen.getByRole('button', { name: 'Entrar' });
    const email = screen.getByLabelText(/email/i);
    const senha = screen.getByLabelText(/senha/i);

    expect(btnEntrar).toBeDisabled();

    userEvent.type(email, 'usuario@email.com');
    userEvent.type(senha, '123456');

    expect(btnEntrar).toBeEnabled();
  });
});
