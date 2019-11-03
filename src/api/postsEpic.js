import { combineEpics, ofType } from 'redux-observable';

import { of } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';


import { 
  FETCH_POSTS_ERROR, 
  FETCH_POSTS_REQUEST, 
  FETCH_POSTS_SUCCESS,
  postsSuccess,
  postsError, 
} from '../redux/actions';

const badUrl = 'https://this_should_fail:5555';
const url = 'https://jsonplaceholder.typicode.com/posts';

/**
 * Fetch posts data from https://jsonplaceholder.typicode.com/posts
 */
export const fetchPosts = (action$, state$, { getJSON }) => action$.pipe(
    tap(ev => console.log(`[epic] fetchPosts received action => ${ev.type}`)),
    ofType(FETCH_POSTS_REQUEST),
    map(action => {
      if (action.payload && (action.payload.fail === true)) {
        console.log(`Simulating network error by requesting ${badUrl}`);
        return badUrl;
      }
      else {
        return url;
      }
    }),
    switchMap(url =>
      getJSON(url).pipe(
        map(data => postsSuccess(data)),
        catchError(err => of(postsError(err)))
      )
    )
  );
