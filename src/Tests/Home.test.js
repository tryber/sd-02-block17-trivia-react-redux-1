import React from 'react';
import { cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { createStore, combineReducers } from 'redux';
import InitialInputs from '../components/InitialInputs';
import App from '../App';

afterEach(cleanup);

const initialState = {
  // inputChanges: {
    name: '',
    email: '',
  // }
};

const inputChanges = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        [action.name]: action.value,
      };
    default: return state;
  }
}

const INITIAL_STATE = {
  categorie: '',
  difficulty: '',
  type: '',
};

const selectorsChange = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CHANGE_SELECTORS':
      return {
        ...state,
        [action.name]: action.value,
      };
    default: return state;
  }
};

const mergeReducers = combineReducers({
  inputChanges,
  selectorsChange,
});


const renderWithRedux = (
  component,
  {
    initialState,
    store = createStore(mergeReducers, initialState)
  } = {}) => ({
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  });

describe('1. Home', () => {
  test('Initial page renders all data to start game', () => {
    const { getByText } = renderWithRedux(<App />);
    const emailTitle = getByText(/Email do Gravatar/i);
    expect(emailTitle).toBeInTheDocument();
  });
});
