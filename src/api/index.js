import { combineEpics } from 'redux-observable';

import { fetchPosts } from './postsEpic';

export default combineEpics(fetchPosts);