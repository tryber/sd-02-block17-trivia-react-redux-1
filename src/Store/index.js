import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import RootReducer from '../Reducers';

const store = createStore(RootReducer, applyMiddleware(thunk));

export default store;
