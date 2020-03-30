import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux';
import RootReducer from '../../reducers';
import thunk from 'redux-thunk';

const renderWithRedux = (
  component,
  {
    store = createStore(RootReducer, applyMiddleware(thunk)),
  } = {}) => ({
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  });

export default renderWithRedux;
