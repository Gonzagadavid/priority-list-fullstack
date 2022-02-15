import React from 'react';
import Greeting from '../Greeting';
import './style.css';

function Header() {
  return (
    <div className="Header">
      <h1>Priority List</h1>
      <Greeting />
    </div>
  );
}

export default Header;
