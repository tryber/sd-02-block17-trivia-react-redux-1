import { combineReducers } from 'redux';
import inputChanges from './inputChangeReducers';

const RootReducer = combineReducers({
  inputChanges,
});

export default RootReducer;
