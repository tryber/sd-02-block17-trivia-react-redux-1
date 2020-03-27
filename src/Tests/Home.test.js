import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import { createStore, combineReducers } from 'redux';
import App from '../App';

const initialState = {
  name: '',
  email: '',
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
  test('Initial page renders all data, inputs and button to start game', () => {
    const { getByText, getByTestId } = renderWithRedux(<App />);
    
    const emailTitle = getByText(/Email do Gravatar/i);
    expect(emailTitle).toBeInTheDocument();

    const inputEmail = getByTestId(/input-gravatar-email/i)
    expect(inputEmail).toBeInTheDocument()
    expect(inputEmail.tagName).toBe('INPUT');

    const nameTitle = getByText(/Nome do jogador/i);
    expect(nameTitle).toBeInTheDocument();

    const nameInput = getByTestId(/input-player-name/i);
    expect(nameInput).toBeInTheDocument();
    expect(nameInput.tagName).toBe('INPUT');

    const configButton = getByTestId(/config-button/i);
    expect(configButton).toBeInTheDocument();
    expect(configButton.tagName).toBe('BUTTON');
  });
});
