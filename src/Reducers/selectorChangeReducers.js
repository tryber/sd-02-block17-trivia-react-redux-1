import { CHANGE_SELECTORS } from '../actions';

const INITIAL_STATE = {
  categorie: '',
  difficult: '',
  type: '',
};

const selectorsChange = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_SELECTORS:
      return {
        ...state,
        [action.name]: action.value,
      };
    default: return state;
  }
};

export default selectorsChange;