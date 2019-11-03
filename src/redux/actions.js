/*
 * action types
 */

export const FETCH_POSTS_ERROR = '[app] FETCH_POSTS_ERROR'
export const FETCH_POSTS_REQUEST = '[app] FETCH_POSTS_REQUEST'
export const FETCH_POSTS_SUCCESS = '[app] FETCH_POSTS_SUCCESS'

const randomiseNetworkConnectionFlag = () => {
  const fail = Math.random()<.5;
  console.log(`Generating failure ${fail}`);
  return fail;
}


/*
 * action creators
 */

export function postsRequest() {
  return { 
    type: FETCH_POSTS_REQUEST, 
    payload: { fail: randomiseNetworkConnectionFlag() } 
  };
}

export function postsSuccess(posts) {
  return { type: FETCH_POSTS_SUCCESS, payload: posts };
}

export function postsError(error) {
  return { type: FETCH_POSTS_ERROR, payload: { hasError: true, error: error } };
}
