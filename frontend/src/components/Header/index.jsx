import React from 'react';
import Greeting from '../Greeting';
import './style.css';

function Header() {
  return (
    <div className="Header">
      <h1>Lista de Prioridades</h1>
      <Greeting />
    </div>
  );
}

export default Header;
