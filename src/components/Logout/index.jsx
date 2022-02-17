import React from 'react';
import { useDispatch } from 'react-redux';
import { actionlogged, actionReset } from '../../redux/actions/appActions';
import { clearStorage } from '../../services/storage';
import './style.css';

function Logout() {
  const dispatch = useDispatch();

  const logout = () => {
    clearStorage('todo-user');
    dispatch(actionReset);
    dispatch(actionlogged(false));
  };
  return (
    <div className="Logout">
      <button type="button" onClick={logout}>Sair</button>
    </div>
  );
}

export default Logout;
