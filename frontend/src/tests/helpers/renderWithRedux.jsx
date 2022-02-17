import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import getStore from './getStore';

const renderWithRedux = (component, initialState) => {
  const store = getStore(initialState);
  return {
    ...render(
      <Provider store={store}>
        {component}
      </Provider>,
    ),
    store,
  };
};

export default renderWithRedux;
