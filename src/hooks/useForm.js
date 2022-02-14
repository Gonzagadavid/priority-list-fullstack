import { useState } from 'react';

const useForm = (initialState) => {
  const [state, setState] = useState(initialState);

  const setFormState = ({
    target: {
      value, checked, name, type,
    },
  }) => {
    const newValue = type === 'checkbox' || type === 'radio' ? checked : value;
    setState({ ...state, [name]: newValue });
  };

  const resetForm = (newState = initialState) => { setState(newState); };

  return [state, setFormState, resetForm];
};

export default useForm;
