import React from 'react';
import { useDispatch } from 'react-redux';
import { signForm } from '../../constants/forms';
import { CONFIRM_PASSWORD } from '../../constants/messages';
import checkEmail from '../../functions/checkEmail';
import checkFields from '../../functions/checkFields';
import useForm from '../../hooks/useForm';
import { actionLoginRender, actionMessage } from '../../redux/actions/appActions';
import register from '../../redux/thunks/register';
import './style.css';

function Signup() {
  const [form, setForm] = useForm(signForm);
  const dispatch = useDispatch();
  const {
    name, lastname, email, password, confirm,
  } = form;
  const checked = checkFields(Object.values(form)) && checkEmail(email);

  const sendRegister = () => {
    if (password !== confirm) return dispatch(actionMessage(CONFIRM_PASSWORD));
    return dispatch(register(form));
  };

  return (
    <div className="Login">
      <h2>Cadastro</h2>
      <div className="form">
        <label htmlFor="name">
          Nome:
          <input id="name" name="name" type="text" value={name} onInput={setForm} placeholder="Nome" />
        </label>
        <label htmlFor="lastname">
          Sobrenome:
          <input id="lastname" name="lastname" type="text" value={lastname} onInput={setForm} placeholder="Sobrenome" />
        </label>
        <label htmlFor="email">
          Email:
          <input id="email" name="email" type="text" value={email} onInput={setForm} placeholder="usuario@email.com" />
        </label>
        <label htmlFor="password">
          Senha:
          <input id="password" name="password" type="password" value={password} onChange={setForm} placeholder="******" />
        </label>
        <label htmlFor="confirm">
          Confirme a senha:
          <input id="confirm" name="confirm" type="password" value={confirm} onChange={setForm} placeholder="******" />
        </label>
      </div>
      <div className="btn-container">
        <button type="button" disabled={!checked} onClick={sendRegister}>Cadastrar</button>
        <button type="button" onClick={() => dispatch(actionLoginRender(true))}>Entrar</button>
      </div>
    </div>
  );
}

export default Signup;
