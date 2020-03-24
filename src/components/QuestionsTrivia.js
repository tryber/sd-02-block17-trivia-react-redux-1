import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

import { fetchQuestions } from '../actions';

import '../style/QuestionsTrivia.css';

const randomQuestions = (results, index) => {
  if (results) {
    return [...results[index].incorrect_answers, results[index].correct_answer];
  }
}

class QuestionsTrivia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      isEndGame: false,
      isAnswered: false,
      clock: 30,
    }
  }
  componentDidMount() {
    const { getQuestions, categorie, difficulty, type } = this.props;
    const adjustedCategorie = categorie ? `&category=${categorie}` : '';
    const adjustedDifficult = difficulty ? `&difficulty=${difficulty}` : '';
    const adjustedType = type ? `&type=${type}` : '';
    getQuestions(adjustedCategorie, adjustedDifficult, adjustedType);
  }

  changeIndex() {
    if (this.state.index < 4) {
      console.log(this.state.index);
      this.setState({
        index: this.state.index + 1,
        isAnswered: false,
      });
    }
    if (this.state.index === 4) {
      console.log(this.state.isEndGame);
      this.setState({
        isEndGame: true,
      });
    }
  };

  clockTimer() {
    const { clock } = this.state;
    // setInterval((clock) => {
    //   this.setState({
    //     clock: this.state.clock - 1,
    //   })
    // }, 1000);
  }

  validAnswer(userAnswer, correctAnswer) {
    console.log(userAnswer, correctAnswer)
    this.setState({
      isAnswered: true,
    })
  }

  classNameToButton(userAnswer, correctAnswer) {
    const { isAnswered } = this.state;
    console.log('1', userAnswer, '2', correctAnswer)
    if (!isAnswered) return "Btn_grey";
    if (userAnswer === correctAnswer) return "Btn_green"
    return "Btn_red";
  }

  render() {
    const { index, isEndGame } = this.state;
    const { results } = this.props;
    if (!results) return <div>Loading...</div>;
    const allAnswers = randomQuestions(results, index);
    if (isEndGame) return <Redirect to="/feedback" />;
    return (
      <div className="Questions_father">
        <div className="Question">

          <div className="Question_title">
            <p>{results[index].category}</p>
          </div>

          <div className="Question_phrase">
            <p>{results[index].question}</p>
          </div>
        </div>

        <div className="Selections">
          {allAnswers.sort().map((answer) => (
            <button
              className={this.classNameToButton(answer, results[index].correct_answer)}
              key={answer}
              disabled={this.state.isAnswered}
              type="button"
              onClick={(e) => this.validAnswer(e.target.value, results[index].correct_answer)}
            >
              {answer}
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
});

QuestionsTrivia.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  results: PropTypes.instanceOf(Array).isRequired,
  categorie: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsTrivia);
