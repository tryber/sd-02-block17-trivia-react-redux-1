import { combineReducers } from 'redux';
import inputChanges from './inputChangeReducers';
import selectorsChange from './selectorChangeReducers';
import questionsReducer from './questionsReducer';
import scoreChangeReducer from './scoreChangeReducer';

const RootReducer = combineReducers({
  inputChanges,
  selectorsChange,
  questionsReducer,
  scoreChangeReducer,
});

export default RootReducer;
