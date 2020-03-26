import { getsQuestions } from '../services/triviaAPI';

export const CHANGE_INPUT = 'CHANGE_INPUT';
export const GET_CATEGORIE = 'GET_CATEGORIE';
export const CHANGE_SELECTORS = 'CHANGE_SELECTORS';

export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const RECEIVE_Q_SUCCESS = 'RECEIVE_Q_SUCCESS';
export const RECEIVE_Q_FAILURE = 'RECEIVE_Q_FAILURE';

export const CHANGE_SCORE = 'CHANGE_SCORE';

const requestQuestions = () => ({
  type: REQUEST_QUESTIONS,
});

const receiveQuestionsFailure = (error) => ({
  type: RECEIVE_Q_FAILURE,
  error,
});

const receiveQuestionsSuccess = ({ results, response_code }) => ({
  type: RECEIVE_Q_SUCCESS,
  results,
});

export function fetchQuestions(categorie, difficult, type) {
  return (dispatch) => {
    dispatch(requestQuestions());

    return getsQuestions(categorie, difficult, type)
      .then(
        (questions) => dispatch(receiveQuestionsSuccess(questions)),
        (error) => dispatch(receiveQuestionsFailure(error.message)),
      );
  };
}

export const handlingInputChanges = (value, name) => ({
  type: CHANGE_INPUT,
  value,
  name,
});

export const getAllCategories = (categories) => ({
  type: GET_CATEGORIE,
  categories,
});

export const handleSelectorsChanges = (value, name) => ({
  type: CHANGE_SELECTORS,
  value,
  name,
});

export const handleScoreChanges = (value) => ({
  type: CHANGE_SCORE,
  value,
});
