import React from 'react';
import { cleanup, render } from '@testing-library/react';
import renderWithRedux from './services/renderWithRedux';
import App from '../App';
import renderWithRedux from './services/renderWithRouter';

afterEach(cleanup);

describe('1. Home', () => {
  test('Initial page renders all data to start game', () => {
    const { getByText } = renderWithRedux(<App />);
    const emailTitle = getByText(/Email do Gravatar/i);
    expect(emailTitle).toBeinTheDocument();
  });
});
