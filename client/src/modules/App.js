import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import { ParticipantsActions } from 'actions';

import {
  ConnectRoomContainer,
  MeetingRoomContainer,
} from "modules";

import {
  AuthRoute,
  hasRoomMiddleware
} from 'AuthMiddlewares';

function NotFound() {
  return (
    <div>
      <h1>404 - NOT FOUND</h1>
    </div>
  );
}

const mapStateToProps = () => {
	return {
	};
};

const mapDispatchToProps = {
  initLocalUser: ParticipantsActions.initLocalUser
};

@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {
  static propTypes = {
    initLocalUser: PropTypes.func,
  }

  static defaultProps = {
    initLocalUser: () => null
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Switch>
          <AuthRoute
            path="/meeting/:roomName"
            component={MeetingRoomContainer}
            middlewares={[{ middleware: hasRoomMiddleware, redirect: '/' }]}
          />
          <Route exact path="/" component={ConnectRoomContainer} />
          <Route path="*" component={NotFound} />
        </Switch>
      </React.Fragment >
    );
  }
}

export default App;
