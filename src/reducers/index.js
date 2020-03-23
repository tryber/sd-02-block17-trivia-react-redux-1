import { combineReducers } from 'redux';
import inputChanges from './inputChangeReducers';
import selectorsChange from './selectorChangeReducers';
import questionsReducer from './questionsReducer';

const RootReducer = combineReducers({
  inputChanges,
  selectorsChange,
  questionsReducer,
});

export default RootReducer;
