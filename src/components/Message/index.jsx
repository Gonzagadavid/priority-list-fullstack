import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionError, actionMessage } from '../../redux/actions/appActions';
import ConditionalComponent from '../ConditionalComponent';
import './style.css';

function Message() {
  const appState = useSelector((state) => state.appReducer);
  const dispatch = useDispatch();
  const { error, message } = appState;
  const alert = error || message;

  const checkedMessage = () => {
    dispatch(actionError(''));
    dispatch(actionMessage(''));
  };

  return (
    <ConditionalComponent condition={!!alert}>
      <div className="Message">
        <div className="message-container">
          <h2>{alert}</h2>
          <button type="button" onClick={checkedMessage}>OK</button>
        </div>
      </div>
    </ConditionalComponent>
  );
}

export default Message;
