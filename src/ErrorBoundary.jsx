import React, { Component } from 'react';

import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { UnregisterCallback } from 'history';

export class ErrorBoundary extends Component {
  static homePath = '/';

  unlisten = undefined;

  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined,
      info: undefined,
    };
    this.goHome = this.goHome.bind(this);
  }

  componentDidMount() {
    this.unlisten = this.props.history.listen(() => {
      if (this.state.hasError) {
        this.setState({ hasError: false });
      }
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  async componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error: error,
      info: info,
    });
  }

  goHome() {
    this.props.history.push(ErrorBoundary.homePath);
  }

  render() {
    if (this.state.hasError) {
      return (
        <React.Fragment>
          <p>An error occurred</p>
          <Link to = "/">Return Home</Link>
        </React.Fragment>
      );
    }

    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);


