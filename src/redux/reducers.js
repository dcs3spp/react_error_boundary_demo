import { combineReducers } from 'redux'
import {
  FETCH_POSTS_ERROR,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
} from './actions'

/**
 * Error State
 */
const initialErrorState = {
  hasError: false,
  error: undefined,
};

function isLoading (state=false, action) { 
  switch(action.type) {
    case FETCH_POSTS_REQUEST: {
      return true;
    }
    case FETCH_POSTS_ERROR:
    case FETCH_POSTS_SUCCESS:
    {
      return false;
    }
    default: {
      return state;
    }
  }
}

function success (state=[], action) {
  switch(action.type) {
    case FETCH_POSTS_SUCCESS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}

function error (state=initialErrorState, action) {
  switch(action.type) {
    case FETCH_POSTS_REQUEST:
    case FETCH_POSTS_SUCCESS: {
      console.log(`error reducer is resetting error state upon receipt of action ${action.type}`);
      return {
        hasError: false,
        error: undefined,
      }
    }
    case FETCH_POSTS_ERROR: {
      console.log(`Reducing FETCH_POSTS_ERROR with ${action.payload.hasError} and error ${action.payload.error}`);
      
      return {
        hasError: action.payload.hasError,
        error: action.payload.error,
      }
    }
    default: {
      return state;
    }
  }
}

const postsReducers = combineReducers({
  isLoading: isLoading,
  posts: success,
  error: error,
});

export default postsReducers;
