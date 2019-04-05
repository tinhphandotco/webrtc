import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";


import {
  ConnectRoomContainer,
  MeetingRoomContainer,
} from "modules";

// import {
//   AuthRoute,
//   hasRoomMiddleware
// } from 'AuthMiddlewares';

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
};

@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {
  static propTypes = {
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route
            path="/meeting/:roomName"
            component={MeetingRoomContainer}
            // middlewares={[{ middleware: hasRoomMiddleware, redirect: '/' }]}
          />
          <Route exact path="/" component={ConnectRoomContainer} />
          <Route path="*" component={NotFound} />
        </Switch>
      </React.Fragment >
    );
  }
}

export default App;
