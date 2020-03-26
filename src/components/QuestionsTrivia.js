import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchQuestions, handleScoreChanges } from '../actions';

import '../style/QuestionsTrivia.css';

const randomQuestions = (results, index) => {
  if (results) {
    return [...results[index].incorrect_answers, results[index].correct_answer];
  }
  return '';
};

const calculateScore = (difficulty) => {
  switch (difficulty) {
    case 'easy':
      return 1;
    case 'medium':
      return 2;
    case 'hard':
      return 3;
    default: return '';
  }
};

class QuestionsTrivia extends Component {

  static notFound() {
    return (
      <div>
        <h1>Não foram encontradas perguntas</h1>
        <Link to="/">
          <button>Voltar ao início</button>
        </Link>
      </div>
    );
  }

  static setRanking() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { name, score, picture } = state.player;
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    const newPlayer = { name, score, picture };
    const newRanking = [...ranking, newPlayer];
    localStorage.setItem('ranking', JSON.stringify(newRanking));
  }

  static renderQuestion(clock, category, question) {
    return (
      <div className="questions-text">
        <div className="questions-title">
          <div>
            <p
              data-testid="question-category"
              className="questions-category"
            >
              {category}
            </p>
          </div>
          <p
            data-testid="question-text"
            className="questions-phrase"
          >
            {question}
          </p>
        </div>
        <p
          data-testid="timer"
          className="questions-clock"
        >
          Tempo: {clock}
        </p>
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      isEndGame: false,
      isAnswered: false,
      rightQuestions: 0,
      clock: 30,
      score: 0,
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(() => {
      const { clock } = this.state;
      if (clock > 0) {
        this.setState((prevState) => ({
          clock: prevState.clock - 1,
        }));
      }
      if (clock === 0) {
        clearInterval(this.clockTimer);
        this.setState(() => ({
          isAnswered: true,
        }));
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  changeIndex() {
    const { rightQuestions, score } = this.state;
    const state = JSON.parse(localStorage.getItem('state'));
    state.player.assertions = rightQuestions;
    state.player.score = score;
    localStorage.setItem('state', JSON.stringify(state));
    if (this.state.index < 4) {
      this.setState({
        index: this.state.index + 1,
        isAnswered: false,
        clock: 30,
      });
    }
    if (this.state.index === 4) {
      this.setState({
        isEndGame: true,
      });
      QuestionsTrivia.setRanking();
    }
  }

  validAnswer(userAnswer, objAnswer) {
    const { changeScore } = this.props;
    const { correct_answer: correctAnswer, difficulty } = objAnswer;
    const newScore = 10 + (calculateScore(difficulty) * this.state.clock);
    if (userAnswer === correctAnswer) {
      this.setState({
        rightQuestions: this.state.rightQuestions + 1,
        score: this.state.score + newScore,
      });
      changeScore(newScore);
    }
    this.setState({
      isAnswered: true,
    });
  }

  classNameToButton(userAnswer, correctAnswer) {
    const { isAnswered } = this.state;
    if (!isAnswered) return 'btn-grey';
    if (userAnswer === correctAnswer) return 'btn-green';
    return 'btn-red';
  }

  buttonNext() {
    const { isAnswered } = this.state;
    return (
      <button
        type="button"
        className="btn-next"
        hidden={!isAnswered}
        data-testid="btn-next"
        onClick={() => this.changeIndex()}
      >
        PRÓXIMA
      </button>
    );
  }

  render() {
    const { index, isEndGame, clock } = this.state;
    const { results } = this.props;
    if (!results) return <div>Loading...</div>;
    // if (results.length === 0) return QuestionsTrivia.notFound();
    const allAnswers = randomQuestions(results, index);
    if (isEndGame) return <Redirect to="/feedback" />;
    return (
      <div className="questions-container">
        {QuestionsTrivia.renderQuestion(
          clock,
          results[index].category,
          results[index].question,
        )}
        <div className="questions-buttons">
          {allAnswers.sort().map((answer) => (
            <button
              className={this.classNameToButton(answer, results[index].correct_answer)}
              key={answer}
              disabled={this.state.isAnswered}
              type="button"
              onClick={() => this.validAnswer(answer, results[index])}
            > {answer}
            </button>
          ))}
          {this.buttonNext()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  selectorsChange: { categorie, difficulty, type },
  questionsReducer: { results },
}) => ({ results, categorie, difficulty, type });

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (categorie, difficulty, type) =>
    dispatch(fetchQuestions(categorie, difficulty, type)),
  changeScore: (value) => dispatch(handleScoreChanges(value)),
});

QuestionsTrivia.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  results: PropTypes.instanceOf(Array),
  categorie: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  changeScore: PropTypes.func.isRequired,
};


QuestionsTrivia.defaultProps = {
  results: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsTrivia);
