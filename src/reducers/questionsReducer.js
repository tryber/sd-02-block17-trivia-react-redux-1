import { REQUEST_QUESTIONS, RECEIVE_Q_SUCCESS, RECEIVE_Q_FAILURE } from '../actions';

const INITIAL_Q_STATE = {
  isFetching: false,
};

const questionsReducer = (state = INITIAL_Q_STATE, action) => {
  // console.log('received action: ', action);
  const { results, responseCode } = action;
  switch (action.type) {
    case REQUEST_QUESTIONS:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_Q_SUCCESS:
      return {
        ...state,
        isFetching: false,
        results,
        responseCode,
      };
    case RECEIVE_Q_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default questionsReducer;
