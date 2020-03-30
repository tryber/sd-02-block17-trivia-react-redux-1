import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRedux from './services/renderWithRedux';
import App from '../App';

describe('3. Game', () => {
  test('The game is running with good performance', () => {
    const { getByTestId, getByText } = renderWithRedux(<App />);
    
    const nameInput = getByTestId(/input-player-name/i);
    const emailInput = getByTestId(/input-gravatar-email/i)
    fireEvent.change(emailInput, { target: { value: 'teste@teste.com.br' } });
    fireEvent.change(nameInput, { target: { value: 'Teste' } });

    const playButton = getByTestId(/btn-play/i);
    fireEvent.click(playButton);

    console.log(window.location.href);
  });
});
