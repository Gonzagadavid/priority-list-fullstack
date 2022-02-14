import React from 'react';
import { useDispatch } from 'react-redux';
import useInput from '../../hooks/useInput';
import { actionLoginRender } from '../../redux/actions/appActions';
import login from '../../redux/thunks/login';
import { saveLocal, saveSession } from '../../services/storage';
import './style.css';

function Login() {
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');
  const [stayLogged, setStayLogged] = useInput(true);
  const dispatch = useDispatch();
  const sendLogin = () => {
    const callbackSave = stayLogged ? saveLocal : saveSession;
    dispatch(login({ email, password }, callbackSave));
  };

  return (
    <div className="Login">
      <h2>Entrar</h2>
      <div className="form">
        <label htmlFor="email">
          Email:
          <input id="email" type="text" value={email} onInput={setEmail} placeholder="usuario@email.com" />
        </label>
        <label htmlFor="password">
          Senha:
          <input id="password" type="password" value={password} onChange={setPassword} placeholder="******" />
        </label>
        <label htmlFor="stayLogged" className="check">
          <input id="stayLogged" type="checkbox" checked={stayLogged} onChange={setStayLogged} />
          Manter-se conectado
        </label>
      </div>
      <div className="btn-container">
        <button type="button" onClick={sendLogin}>Entrar</button>
        <button type="button" onClick={() => dispatch(actionLoginRender(false))}>Cadastrar</button>
      </div>
    </div>
  );
}

export default Login;
