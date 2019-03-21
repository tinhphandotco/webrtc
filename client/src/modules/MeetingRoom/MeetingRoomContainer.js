import React from "react";
import { connect } from "react-redux";

import path from 'ramda/src/path';

import { getLocalUserInfo } from 'reducers/users/select';

import { UsersActions } from 'actions';

import {
  Input,
  message,
} from 'antd';
import { Button } from 'components';

import { AskActiveDevices } from './atomics';

import * as serviceWebRTC from 'services/WebRTC';

const mapStateToProps = (state, props) => {
	return {
    localUserInfo: getLocalUserInfo(state)
	}
};

const mapDispatchToProps = {
  setLocalStream: UsersActions.setLocalStream
};

@connect(mapStateToProps, mapDispatchToProps)
class MeetingRoomContainer extends React.Component {
  get everyDevicesActive() {
    return path(['video', 'active'], this.localUserSettings) && path(['audio', 'active'], this.localUserSettings);
  }

  constructor(props) {
    super(props);

    this.state = {
      readyToMeeting: false
    };
  }

  componentDidMount() {
    serviceWebRTC.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        this.props.setLocalStream(this.props.localUserInfo.id, stream);
      })
      .catch((error) => {
        message.warning(error.name);
      })
      .finally(() => {
        this.setState({
          readyToMeeting: true
        });
      })
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.readyToMeeting && (
          <AskActiveDevices />
        )}
      </React.Fragment>
    )
  }
}

export default MeetingRoomContainer