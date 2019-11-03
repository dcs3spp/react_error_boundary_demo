import React from 'react';

import { Link } from 'react-router-dom';

export default () => {
  return (
    <React.Fragment>
      <h1>Home Page</h1>
      <Link to="/posts">Posts</Link>
    </React.Fragment>
  );
}
