import React from 'react';
import { fireEvent, waitForDomChange } from '@testing-library/react';
import renderWithRedux from './services/renderWithRedux';
import App from '../App';

describe('2. Settings', () => {
  test('Config Screen is working fine', async () => {
    const { getByText, getByTestId } = renderWithRedux(<App />);

    const configButton = getByTestId(/config-button/i);
    fireEvent.click(configButton);

    const categorySelector = getByTestId(/question-category-dropdown/i);
    await waitForDomChange();
    fireEvent.change(categorySelector, { target: { value: "27" } });
    const categoryOptions = getByTestId(/category-option-27/i);
    expect(categoryOptions.innerHTML).toBe('Animals');
    fireEvent.change(categorySelector, { target: { value: "12" } });

    const difficultySelector = getByTestId(/question-difficulty-dropdown/i);
    fireEvent.change(difficultySelector, { target: { value: 'easy' } });
    expect(difficultySelector.value).toBe('easy');

    const typeSelector = getByTestId(/question-type-dropdown/i);
    fireEvent.change(typeSelector, { target: { value: 'multiple' } });

    const backToHome = getByText(/Voltar/i);
    expect(backToHome).toBeInTheDocument();
    fireEvent.click(backToHome);
  });
});
