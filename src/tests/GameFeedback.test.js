import React from 'react';
import MD5 from 'crypto-js/md5';
import { fireEvent, waitForDomChange } from '@testing-library/react';
import renderWithRedux from './services/renderWithRedux';
import App from '../App';

describe('3. Game', () => {
  test('The game is running with good performance', async () => {
    const { getByTestId, getByAltText, getByText, getAllByTestId } = renderWithRedux(<App />);

    const nameInput = getByTestId(/input-player-name/i);
    const emailInput = getByTestId(/input-gravatar-email/i)
    fireEvent.change(emailInput, { target: { value: 'teste@teste.com.br' } });
    fireEvent.change(nameInput, { target: { value: 'Teste' } });

    const playButton = getByTestId(/btn-play/i);
    fireEvent.click(playButton);

    expect(window.location.href.includes('game')).toBeTruthy();

    const loading = getByText(/loading/i);
    expect(loading).toBeInTheDocument();

    await waitForDomChange();

    const nameHeader = getByText(/Teste/i);
    expect(nameHeader).toBeInTheDocument();

    const imagePlayer = getByAltText(/teste player gravatar/i);
    const emailValue = 'teste@teste.com.br'
    const hashValueSrc = MD5(emailValue.toLowerCase().trim());
    expect(imagePlayer.src.includes(hashValueSrc)).toBeTruthy();

    const score = getByTestId('header-score');
    expect(score.innerHTML).toBe('Pontos: 0');

    const allAnswers = getAllByTestId(/answer/i);
    allAnswers.forEach(answer => expect(answer.tagName).toBe('BUTTON'));

    const wrongQuestions = getAllByTestId(/wrong-answer/i);
    expect(wrongQuestions.length === 1 || wrongQuestions.length === 3).toBeTruthy();
    
    const correctQuestion = getByTestId(/correct-answer/i);
    const nextQuestion = getByTestId(/btn-next/i);
    expect(nextQuestion.hidden).toBeTruthy();

    fireEvent.click(correctQuestion);

    expect(nextQuestion.hidden).toBeFalsy();
    expect(score.innerHTML).not.toBe('Pontos: 0');
    fireEvent.click(nextQuestion);
    const playerScore = JSON.parse(localStorage.getItem('state')).player.score;
    fireEvent.click(wrongQuestions[0]);
    expect(score.innerHTML.includes(playerScore)).toBeTruthy();
    fireEvent.click(nextQuestion);
    fireEvent.click(correctQuestion);
    fireEvent.click(nextQuestion);
    fireEvent.click(correctQuestion);
    fireEvent.click(nextQuestion);
    fireEvent.click(correctQuestion);
    fireEvent.click(nextQuestion);
    
    expect(nextQuestion).not.toBeInTheDocument();
    expect(window.location.href.includes('/game')).toBeFalsy();

    
  });
});
