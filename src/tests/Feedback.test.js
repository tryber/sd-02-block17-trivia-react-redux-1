import React from 'react';
import { fireEvent, cleanup, getByText  } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import renderWithRedux from './services/renderWithRedux';
import Feedback from '../pages/Feedback';

afterEach(cleanup);

describe('4. Feedback', () => {
  test('Testing page itens and assertions < 3', () => {
    const history = createMemoryHistory()
    const locStor = { "player": { "name": "Johnatas Henrique", "assertions": 3, "score": 109, "gravatarEmail": "johnatas.henrique@hotmail.com", "picture": "https://www.gravatar.com/avatar/341d67fb382dc474f7e728f363e9aada?d=https://www.gravatar.com/avatar/2d3bf5b67282f5f466e503d7022abcf3" } };
    localStorage.setItem('state', JSON.stringify(locStor));
    const { getByTestId, getByText } = renderWithRedux(
      <Router history={history}>
          <Feedback />
      </Router>
    );
    const state = JSON.parse(localStorage.getItem('state')) || 
  { "player": { "name": "", "assertions": 0, "score": 0, "gravatarEmail": "", "picture": "" } };
    const playerScore = state.player.score;
    const playerAssertions = state.player.assertions;
    const answerNumber = playerAssertions >= 3 ? 'Mandou bem!' : 'Podia ser melhor...';
    const feedbackText = getByTestId(/feedback-text/i);
    const feedbackAssertions = getByTestId(/feedback-total-question/i);
    const feedbackScore = getByTestId(/feedback-total-score/i);
    expect(feedbackText).toBeInTheDocument();
    expect(feedbackText.innerHTML).toBe(answerNumber);
    expect(feedbackAssertions).toBeInTheDocument();
    expect(feedbackAssertions.innerHTML).toBe(`Você acertou ${playerAssertions} questões!`);
    expect(feedbackScore).toBeInTheDocument();
    expect(feedbackScore.innerHTML).toBe(`Um total de ${playerScore} pontos`);
    const rankingBtn = getByText(/Ver Ranking/i);
    expect(rankingBtn).toBeInTheDocument();
    fireEvent.click(rankingBtn);
    expect(window.location.href.includes('/feedback')).toBeFalsy();
  });

  test('Testing page itens and assertions < 3', () => {
    const history = createMemoryHistory()
    const { getByTestId, getByText } = renderWithRedux(
      <Router history={history}>
          <Feedback />
      </Router>
    );
    const state = JSON.parse(localStorage.getItem('state')) || 
  { "player": { "name": "", "assertions": 0, "score": 0, "gravatarEmail": "", "picture": "" } };
    const playerScore = state.player.score;
    const playerAssertions = state.player.assertions;
    const answerNumber = playerAssertions >= 3 ? 'Mandou bem!' : 'Podia ser melhor...';
    const feedbackText = getByTestId(/feedback-text/i);
    const feedbackAssertions = getByTestId(/feedback-total-question/i);
    const feedbackScore = getByTestId(/feedback-total-score/i);
    expect(feedbackText).toBeInTheDocument();
    expect(feedbackText.innerHTML).toBe(answerNumber);
    expect(feedbackAssertions).toBeInTheDocument();
    expect(feedbackAssertions.innerHTML).toBe(`Você acertou ${playerAssertions} questões!`);
    expect(feedbackScore).toBeInTheDocument();
    expect(feedbackScore.innerHTML).toBe(`Um total de ${playerScore} pontos`);
    const playAgainBtn = getByText(/Jogar novamente/i);
    expect(playAgainBtn).toBeInTheDocument();
    fireEvent.click(playAgainBtn);
    expect(window.location.href.includes('/feedback')).toBeFalsy();
  });
});
