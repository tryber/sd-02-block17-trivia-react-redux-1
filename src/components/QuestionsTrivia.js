import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchQuestions } from '../actions';

class QuestionsTrivia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    }
  }

  componentDidMount() {
    const { getQuestions, categorie, difficulty, type } = this.props;
    const adjustedCategorie = categorie ? `&category=${categorie}` : '';
    const adjustedDifficult = difficulty ? `&difficulty=${difficulty}` : '';
    const adjustedType = type ? `&type=${type}` : '';
    getQuestions(adjustedCategorie, adjustedDifficult, adjustedType);
  }

  render() {
    const { index } = this.state;
    const { results } = this.props;
    const randomQuestions = (results, index) => {
      if (results) {
        return [...results[index].incorrect_answers, results[index].correct_answer];
      }
    }
    const allAnswers = randomQuestions(results, index);
    if (!results) return <div>Loading...</div>;
    return (
      <div>
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
              <button key={answer} type="button">{answer}</button>
            ))}
          </div>
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
