import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRedux from './services/renderWithRedux';
import App from '../App';

describe('2. Settings', () => {
  test('Config Screen is working fine', () => {
    const { getByText, getByTestId } = renderWithRedux(<App />);

    const configButton = getByTestId(/config-button/i);
    fireEvent.click(configButton);
    expect(window.location.href.includes('/settings')).not.toBeTruthy;

    const categorySelector = getByTestId(/question-category-dropdown/i);
    fireEvent.change(categorySelector, { target: { value: 27 } });

    const difficultySelector = getByTestId(/question-difficulty-dropdown/i);
    fireEvent.change(difficultySelector, { target: { value: 'easy' } });

    const typeSelector = getByTestId(/question-type-dropdown/i);
    fireEvent.change(typeSelector, { target: { value: 'multiple' } });

    const backToHome = getByText(/Voltar/i);
    expect(backToHome).toBeInTheDocument();
    fireEvent.click(backToHome);

    expect(window.location.href).toBe('http://localhost/');
  });
});
