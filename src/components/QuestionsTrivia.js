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
    const { name, score, picture } = JSON.parse(localStorage.getItem('player'));
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    const newPlayer = { name, score, picture };
    const newRanking = [...ranking, newPlayer];
    localStorage.setItem('ranking', JSON.stringify(newRanking));
  }

  static renderQuestion(clock, category, question) {
    return (
      <div>
        <div className="Question">
          <p>{clock}</p>
          <div className="Question_title">
            <p>{category}</p>
          </div>

          <div className="Question_phrase">
            <p>{question}</p>
          </div>
        </div>
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
    this.clockTimer();
    const { getQuestions, categorie, difficulty, type } = this.props;
    const adjustedCategorie = categorie ? `&category=${categorie}` : '';
    const adjustedDifficult = difficulty ? `&difficulty=${difficulty}` : '';
    const adjustedType = type ? `&type=${type}` : '';
    getQuestions(adjustedCategorie, adjustedDifficult, adjustedType);
  }

  changeIndex() {
    const { rightQuestions, score } = this.state;
    console.log(rightQuestions);
    console.log(score);
    const player = JSON.parse(localStorage.getItem('player'));
    player.assertions = rightQuestions;
    player.score = score;
    localStorage.setItem('player', JSON.stringify(player));
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

  clockTimer() {
    setInterval(() => {
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
    if (!isAnswered) return 'Btn_grey';
    if (userAnswer === correctAnswer) return 'Btn_green';
    return 'Btn_red';
  }

  render() {
    const { index, isEndGame, clock } = this.state;
    const { results } = this.props;
    if (!results) return <div>Loading...</div>;
    if (results.length === 0) return QuestionsTrivia.notFound();
    const allAnswers = randomQuestions(results, index);
    if (isEndGame) return <Redirect to="/feedback" />;
    return (
      <div className="Questions_father">
        {QuestionsTrivia.renderQuestion(clock, results[index].category, results[index].question)}
        <div className="Selections">
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
          <button
            type="button"
            data-testid="btn-next"
            onClick={() => this.changeIndex()}
          >
            Próximo
            </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  selectorsChange: { categorie, difficulty, type },
  questionsReducer: { results },
}) => (
  {
    results,
    categorie,
    difficulty,
    type,
  }
);

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (categorie, difficulty, type) =>
    dispatch(fetchQuestions(categorie, difficulty, type)),
  changeScore: (value) => dispatch(handleScoreChanges(value)),
});

QuestionsTrivia.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  results: PropTypes.instanceOf(Array).isRequired,
  categorie: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  changeScore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsTrivia);
