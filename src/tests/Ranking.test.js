import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { fireEvent, cleanup } from '@testing-library/react';
import renderWithRedux from './services/renderWithRedux';
import Ranking from '../pages/Ranking';
import App from '../App';

afterEach(cleanup);

describe('5. Ranking', () => {
  test('Testing page ranking', () => {
    const history = createMemoryHistory()
    const locStor = [{ "name": "P2", "score": 40, "picture": "p2" }, { "name": "P1", "score": 150, "picture": "p1" }]
    localStorage.setItem('ranking', JSON.stringify(locStor));
    const { getByTestId, getByText } = renderWithRedux(
      <Router history={history}>
        <Ranking />
      </Router>
    );
    expect(getByText(/ranking/i)).toBeInTheDocument();
    const postion1 = getByTestId(/profile-picture-1/i);
    const postionName1 = getByTestId(/P1-1/i);
    const postion2 = getByTestId(/profile-picture-2/i);
    const postionName2 = getByTestId(/P2-2/i);
    expect(postionName1.innerHTML).toBe('P1 - 150 pontos');
    expect(postion1.src).toBe('http://localhost/p1');
    expect(postionName2.innerHTML).toBe('P2 - 40 pontos');
    expect(postion2.src).toBe('http://localhost/p2');
  });

  // test('Testing returning Home', () => {
  //   const history = createMemoryHistory({initialEntries: ['/ranking']}) 
  //   const { getByTestId, getByText } = renderWithRedux(
  //     <Router history={history}>
  //       <App />
  //     </Router>);
  //   // history.push('/ranking');

  //   const btnReturn = getByTestId(/btn-go-home/i);
  //   console.log(btnReturn);
  //   fireEvent.click(btnReturn);
  //   const emailTitle = getByText(/Email do Gravatar/i);
  //   expect(emailTitle).toBeInTheDocument();
  // })
});