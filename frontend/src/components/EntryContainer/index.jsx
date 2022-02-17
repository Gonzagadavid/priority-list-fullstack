import React from 'react';
import { useSelector } from 'react-redux';
import ConditionalComponent from '../ConditionalComponent';
import Login from '../Login';
import Signup from '../Signup';
import './style.css';

function EntryContainer() {
  const { login, logged } = useSelector((state) => state.appReducer);
  return (
    <ConditionalComponent condition={!logged}>
      <div className="EntryContainer">
        <ConditionalComponent condition={login}>
          <Login />
        </ConditionalComponent>
        <ConditionalComponent condition={!login}>
          <Signup />
        </ConditionalComponent>
      </div>
    </ConditionalComponent>
  );
}

export default EntryContainer;
