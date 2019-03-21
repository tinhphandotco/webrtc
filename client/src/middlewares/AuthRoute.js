import React from 'react';
import { connect } from "react-redux";
import * as R from 'ramda';
import { Redirect, Route } from 'react-router-dom';

import { Maybe } from 'utils';

const mapStateToProps = (state) => ({
  store: state
})

@connect(mapStateToProps)
export default class AuthRoute extends React.Component {
  constructor(props) {
    super(props);

    this.defaultRedirect = this.props.defaultRedirect || { pathname: '/login' };

    this.state = {
      hasntChecked: true,
      isCheckingMiddlewares: false,
      redirect: null
    };
  }

  componentDidMount() {
    this.runMiddlewares();
  }

  componentDidUpdate(prevProps) {
    if (this.props.deepCheck && !R.equals(prevProps.location, this.props.location)) {
      this.runMiddlewares();
    }
  }

  runMiddlewares = () => {
    this.setState({ isCheckingMiddlewares: true, hasntChecked: false });
    const listPromiseMiddlewares = Maybe.toMaybe(this.props.middlewares)
      .map(
        R.compose(
          R.map((item) => {
            return Promise.resolve((item.middleware || item)(this.props.store))
              .catch(_ => Promise.reject(item.redirect ? item.redirect : this.defaultRedirect))
          }),
          R.flatten,
          Array.of
        )
      )
      .getOrElse([]);
    Promise.all(listPromiseMiddlewares)
      .then(_ => { this.setState({ isCheckingMiddlewares: false }) })
      .catch(redirect => { this.setState({ redirect, isCheckingMiddlewares: false }); })
  }

  render() {
    const { component: C, render, ...rest } = this.props;
    return (
      <Route {...rest} render={(props) => {
        if (this.state.isCheckingMiddlewares || this.state.hasntChecked) { return null; }
        if (this.state.redirect) { return (
          <Redirect to={{
            pathname: R.path(['pathname'], this.state.redirect) || this.state.redirect,
            search: R.path(['pathname'], this.state.search) || "",
            state: { from: props.location }
          }} />
        ); }
        if (render) { return render(props); }
        if (C) { return <C {...props} /> }
        return null;
      }}/>
    );
  }
}
