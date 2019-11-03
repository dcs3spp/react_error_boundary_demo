import { ajax } from 'rxjs/ajax';

import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import rootReducer from './reducers';
import rootEpic from '../api';

// configure epic middleware with ajax dependency
export const epicMiddleware = createEpicMiddleware({
  dependencies: { getJSON: ajax.getJSON }
});

// initialise state for app start
const initialState = {};

// create store
const store = createStore(rootReducer, initialState, applyMiddleware(epicMiddleware));

// log initial state
console.log(`initial state => ${JSON.stringify(store.getState())}`);

// spawn the epic middleware
epicMiddleware.run(rootEpic);

// export store 
export default store;
