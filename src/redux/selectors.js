const selectors = {
  getReduxPosts: (state) => state.posts,
  getReduxPostsError: (state) => state.error,
}

export default selectors;
