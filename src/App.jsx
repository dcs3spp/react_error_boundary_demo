import React, { Component, Suspense } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./style.css";

import PostsList from "./PostsList";
import ErrorBoundary from "./ErrorBoundary";
import Home from "./Home";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Suspense fallback={<div>loading...</div>}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/posts">
                <ErrorBoundary>
                  <PostsList />
                </ErrorBoundary>
              </Route>
            </Switch>
          </Suspense>
        </div>
      </BrowserRouter>
    );
  }
}
