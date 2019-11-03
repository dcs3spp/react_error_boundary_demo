### Overview

This is a small temporary react-redux application to demonstrate problem raised on [github](https://github.com/facebook/react/issues/17219).

_PostsList_ is a functional component that displays posts from  https://jsonplaceholder.typicode.com/posts via a redux-observable epic located in folder _api/postsEpic.js_.

The _fetchPost_ action randomises a flag to simulate a network failure. If the flag is activated the epic makes an ajax request to an invalid endpoint url.

If the _PostsList_ component detects an error on the redux store then it throws an error from its render method.
This is caught by an error boundary component _ErrorBoundary_. The error boundary component has a link back to the home page.

When clicking on Posts link from the Home page, the useEffect method within the PostsLists component is not activated. Subsequently, the fetchPosts request action does not occur to reset the redux error state.

This results in the error boundary being displayed again.

How do I get the PostsList component to trigger useEffect when it is had previously thrown an error from render method?

### Usage

Keep clicking on Posts link from the shome page until a random failure flag is triggered. Once the PostsList component has thrown an error it is not reset because the useEffect function is not triggered to make a fetch request. Subsequently the redux error state associated with the fetch action is not cleared. Console log messages are available to show action state and generating failure flag.