import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRedux from './services/renderWithRedux';
import App from '../App';

describe('1. Home', () => {
  test('Initial page renders all data, inputs and button to start game', () => {
    const { getByText, getByTestId } = renderWithRedux(<App />);

    const emailTitle = getByText(/Email do Gravatar/i);
    expect(emailTitle).toBeInTheDocument();

    const emailInput = getByTestId(/input-gravatar-email/i)
    expect(emailInput).toBeInTheDocument()
    expect(emailInput.tagName).toBe('INPUT');

    const nameTitle = getByText(/Nome do jogador/i);
    expect(nameTitle).toBeInTheDocument();

    const nameInput = getByTestId(/input-player-name/i);
    expect(nameInput).toBeInTheDocument();
    expect(nameInput.tagName).toBe('INPUT');

    const configButton = getByTestId(/config-button/i);
    expect(configButton).toBeInTheDocument();
    expect(configButton.tagName).toBe('BUTTON');

    const playButton = getByTestId(/btn-play/i);
    expect(playButton).toBeInTheDocument();
    expect(playButton.tagName).toBe('BUTTON');

    expect(playButton.disabled).toBeTruthy();

    fireEvent.change(emailInput, { target: { value: 'teste@teste.com.br' } });
    fireEvent.change(nameInput, { target: { value: 'Teste' } });

    expect(playButton.disabled).toBeFalsy();
  });
});
