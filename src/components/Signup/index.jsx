import React from 'react';
import { useDispatch } from 'react-redux';
import { signForm } from '../../constants/forms';
import useForm from '../../hooks/useForm';
import { actionLoginRender } from '../../redux/actions/appActions';
import './style.css';

function Signup() {
  const [form, setForm] = useForm(signForm);
  const dispatch = useDispatch();
  const {
    name, lastname, email, password, confirm,
  } = form;

  return (
    <div className="Login">
      <h2>Cadastro</h2>
      <div className="form">
        <label htmlFor="name">
          Nome:
          <input name="name" type="text" value={name} onInput={setForm} placeholder="Nome" />
        </label>
        <label htmlFor="lastname">
          Sobrenome:
          <input name="lastname" type="text" value={lastname} onInput={setForm} placeholder="Sobrenome" />
        </label>
        <label htmlFor="email">
          E-mail:
          <input name="email" type="text" value={email} onInput={setForm} placeholder="usuario@email.com" />
        </label>
        <label htmlFor="password">
          Senha:
          <input name="password" type="password" value={password} onChange={setForm} placeholder="******" />
        </label>
        <label htmlFor="confirm">
          Confirme a senha:
          <input name="confirm" type="password" value={confirm} onChange={setForm} placeholder="******" />
        </label>
      </div>
      <div className="btn-container">
        <button type="button">Cadastrar</button>
        <button type="button" onClick={() => dispatch(actionLoginRender(true))}>Entrar</button>
      </div>
    </div>
  );
}

export default Signup;
