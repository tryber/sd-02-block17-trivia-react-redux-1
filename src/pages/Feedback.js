import React from 'react';
import Header from '../components/Header';
import ToRanking from '../components/ToRanking';
import PlayAgain from '../components/PlayAgain';
import '../style/Feedback.css';
// import { connect } from 'react-redux';

const Feedback = () => {
  // const player = JSON.parse(localStorage.getItem('player'));
  // const { assertions, score } = player;
  const score = 47;
  const assertions = 3;
  const answerTitle = assertions >= 3 ? 'Mandou Bem!' : 'Podia ser Melhor...';
  return (
    <div>
      <Header />
      <div className="Feedback_father-div">
        <h1 data-testid="feedback-text">
          {answerTitle}
        </h1>
        <p>Você acertou
          <span data-testid="feedback-total-question">
            {assertions}
          </span>
          questões!
        </p>
        <p>Um total de
          <span data-testid="feedback-total-score">
            {score}
          </span>
            pontos
        </p>
        <ToRanking buttonName={'Ver Ranking'} />
        <PlayAgain buttonName={'Jogar Novamente'} />
      </div>
    </div >
  );
};

export default Feedback;
