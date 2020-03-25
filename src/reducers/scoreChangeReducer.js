import { CHANGE_SCORE } from '../actions';

const INITIAL_STATE = {
  score: 0,
};

const scoreChange = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_SCORE:
      return {
        ...state,
        score: state.score + action.value,
      };
    default: return state;
  }
};

export default scoreChange;
