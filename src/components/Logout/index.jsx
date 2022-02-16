import React from 'react';
import { useDispatch } from 'react-redux';
import { actionReset } from '../../redux/actions/appActions';
import { clearStorage } from '../../services/storage';
import './style.css';

function Logout() {
  const dispatch = useDispatch();

  const logout = () => {
    clearStorage('todo-user');
    dispatch(actionReset);
  };
  return (
    <div className="Logout">
      <button type="button" onClick={logout}>Sair</button>
    </div>
  );
}

export default Logout;
