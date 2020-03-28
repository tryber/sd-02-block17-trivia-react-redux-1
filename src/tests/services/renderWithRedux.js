import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import RootReducer from '../../reducers';

const renderWithRedux = (
  component,
  {
    initialState,
    store = createStore(RootReducer, initialState),
  } = {}) => ({
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  });

export default renderWithRedux;
