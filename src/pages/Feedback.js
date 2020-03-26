import React from 'react';
import Header from '../components/Header';
import ToRanking from '../components/ToRanking';
import PlayAgain from '../components/PlayAgain';
import '../style/Feedback.css';

const Feedback = () => {
  const player = JSON.parse(localStorage.getItem('player'));
  const { assertions, score } = player;
  const answerTitle = assertions >= 3 ? 'Mandou Bem!' : 'Podia ser Melhor...';
  return (
    <div>
      <Header />
      <div className="Feedback_father-div">
        <h1 data-testid="feedback-text">{answerTitle}</h1>
        <p data-testid="feedback-total-question">Você acertou {assertions} questões!</p>
        <p data-testid="feedback-total-score">Um total de {score} pontos</p>
        <ToRanking buttonName={'Ver Ranking'} />
        <PlayAgain buttonName={'Jogar Novamente'} />
      </div>
    </div>
  );
};

export default Feedback;
