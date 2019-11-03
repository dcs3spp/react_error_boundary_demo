import React, { useEffect } from 'react';

import { connect } from 'react-redux';

import { courseModels } from './redux/features/course';
import { courseSelectors } from './redux/features/course';
import { postsRequest } from './redux/actions';
import selectors from './redux/selectors';

import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

/**
 * Redux dispatch and state mappings
 */
const dispatchProps = {
  fetchPosts: postsRequest,
};

const mapStateToProps = (state) => {
  return ({
  isLoading: state.isLoading,
  posts: selectors.getReduxPosts(state),
  error: selectors.getReduxPostsError(state),
})};

/**
 * CourseList component
 */
const PostsList = ({
  posts = [],
  error,
  fetchPosts,
  history,
  isLoading,
}) => {
  // fetch course action on mount
  useEffect(() => {
    console.log('PostsList => Fetching posts');
    fetchPosts();
  }, [fetchPosts]);

  if (isLoading) {
    console.log('PostsList => isLoading');
    return <p>Loading...</p>;
  }

  if (error && error.hasError && error.error) {
    console.log('PostsList => Encountered an error');
    // option 1. history.push('/error'); // triggers state transition error
    // option 2. throw error.error from redux state;
    // if throw the error from state then the encapsulating error boundary catches and displays
    // however subsequent request actions are not processed by redux-observable action stream....fetchRequest is not activated again and so error state is not cleared.
    // if I render error inside component then the redux-observable stream continues to process subsequent actions.
    // option 3. use <Redirect> tag, seems to prevent state transtion during render error
    // but need to visit /posts link twice before the courses are displayed.
    console.log(`${JSON.stringify(error)}`);
    throw error;
  }

  return (
        <React.Fragment>
          <h2>POSTS</h2>
          <Link to='/'>Home</Link>
          <ul>
            {posts.map((listitem) => (
              <li key={listitem.id}>
                {listitem.title}
              </li>
            ))}
          </ul>
        </React.Fragment>
  );
}

/**
 * Exports
 */
export default withRouter(
  connect(
    mapStateToProps,
    dispatchProps,
  )(PostsList),
);

