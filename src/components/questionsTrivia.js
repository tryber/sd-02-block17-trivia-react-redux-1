import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchQuestions } from '../actions';

class QuestionsTrivia extends Component {

  componentDidMount() {
    const { getQuestions, categorie, difficulty, type } = this.props;
    const adjustedCategorie = categorie ? `&category=${categorie}` : '';
    const adjustedDifficult = difficulty ? `&difficulty=${difficulty}` : '';
    const adjustedType = type ? `&type=${type}` : '';
    getQuestions(adjustedCategorie, adjustedDifficult, adjustedType);
  }

  render() {
    const { results } = this.props;
    console.log(results)
    return (
      < div >
        <h1>Perguntas</h1>
        <h2>{JSON.stringify(results)}</h2>
      </div >
    );
  }
}

const mapStateToProps = ({
  selectorsChange: { categorie, difficulty, type },
  questionsReducer: { results }
}) => (
    {
      results,
      categorie,
      difficulty,
      type
    }
  );

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (categorie, difficulty, type) => dispatch(fetchQuestions(categorie, difficulty, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsTrivia);