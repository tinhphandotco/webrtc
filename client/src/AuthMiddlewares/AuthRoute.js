import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import * as R from 'ramda';
import { Redirect, Route } from 'react-router-dom';

import { Maybe } from 'utils';

const mapStateToProps = (state) => ({
  store: state
});

@connect(mapStateToProps)
export default class AuthRoute extends React.Component {
  static propTypes = {
    defaultRedirect: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    deepCheck: PropTypes.bool,
    location: PropTypes.object.isRequired,
    middlewares: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]).isRequired,
    store: PropTypes.object,
    component: PropTypes.any.isRequired,
    render: PropTypes.func,
  }

  static defaultProps = {
    defaultRedirect: {
      pathname: '/login'
    },
    deepCheck: false,
    store: {},
    render: null
  }

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
              .catch(() => Promise.reject(item.redirect ? item.redirect : this.defaultRedirect));
          }),
          R.flatten,
          Array.of
        )
      )
      .getOrElse([]);
    Promise.all(listPromiseMiddlewares)
      .then(() => { this.setState({ isCheckingMiddlewares: false }); })
      .catch(redirect => { this.setState({ redirect, isCheckingMiddlewares: false }); });
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
        if (C) { return <C {...props} />; }
        return null;
      }}/>
    );
  }
}
