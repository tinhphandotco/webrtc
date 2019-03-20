import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import { UsersActions } from 'actions';

import {
  ConnectRoomContainer,
  MeetingRoomContainer,
} from "modules";

import {
  AuthRoute,
  hasRoomMiddleware
} from 'middlewares';

import * as serviceWebRTC from 'services/WebRTC';

function NotFound() {
  return (
    <div>
      <h1>404 - NOT FOUND</h1>
    </div>
  )
}

const mapStateToProps = (state, props) => {
	return {
	}
};

const mapDispatchToProps = {
  initLocalUser: UsersActions.initLocalUser
};

@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    serviceWebRTC.connect().then(id => this.props.initLocalUser({ id }));
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
