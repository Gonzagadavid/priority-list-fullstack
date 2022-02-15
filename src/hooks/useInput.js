import { useState } from 'react';

const useInput = (initialState) => {
  const [state, setState] = useState(initialState);

  const setInputState = ({ target: { value, checked, type } }) => {
    const newValue = type === 'checkbox' ? checked : value;
    setState(newValue);
  };

  const resetInput = (newState = initialState) => { setState(newState); };

  return [state, setInputState, resetInput];
};

export default useInput;
