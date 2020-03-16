import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Página Inicial', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/home/i);
  expect(linkElement).toBeInTheDocument();
});
