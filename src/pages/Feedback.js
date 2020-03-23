import React from 'react';
import Header from '../components/Header';
import ToRanking from '../components/ToRanking';
// import { connect } from 'react-redux';

const Feedback = () => {
  // const player = JSON.parse(localStorage.getItem('player'));
  // const { rightAnswers, score } = player;
  const score = 47;
  const rightAnswers = 3;
  const answerTitle = rightAnswers >= 3 ? 'Mandou Bem!' : 'Podia ser Melhor...';
  return (
    <div>
      <Header />
      <h1>{answerTitle}</h1>
      <p>Você acertou {rightAnswers} questões!</p>
      <p>Um total de {score} pontos</p>
      <ToRanking />
      <PlayAgain />
    </div>
  );
};

export default Feedback;
