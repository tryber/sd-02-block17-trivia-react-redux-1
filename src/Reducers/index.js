import { combineReducers } from 'redux';
import inputChanges from './inputChangeReducers';
import selectorsChange from './selectorChangeReducers';

const RootReducer = combineReducers({
  inputChanges,
  selectorsChange,
});

export default RootReducer;
