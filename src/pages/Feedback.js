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
    <div className="Feedback_father-div">
      <Header />
      <h1>{answerTitle}</h1>
      <p>Você acertou {assertions} questões!</p>
      <p>Um total de {score} pontos</p>
      <ToRanking buttonName={'Ver Ranking'} />
      <PlayAgain buttonName={'Jogar Novamente'} />
    </div>
  );
};

export default Feedback;
