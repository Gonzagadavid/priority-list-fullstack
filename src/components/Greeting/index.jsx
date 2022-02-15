import React from 'react';
import { useSelector } from 'react-redux';
import ConditionalComponent from '../ConditionalComponent';
import './style.css';

function Greeting() {
  const { name, lastname } = useSelector((state) => state.userReducer);
  const { logged } = useSelector((state) => state.appReducer);
  return (
    <ConditionalComponent condition={logged}>
      <div className="Greeting">
        <p>{`Olá, ${name} ${lastname}`}</p>
      </div>
    </ConditionalComponent>
  );
}

export default Greeting;
