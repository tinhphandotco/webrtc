import React from "react";
import { connect } from "react-redux";

import path from 'ramda/src/path';

import { getLocalUserSettings } from 'reducers/users/select';

import {
  Input,
} from 'antd';
import { Button } from 'components';

// import { ConnectRoom as StyledConnectRoom } from './styled';

import serviceWebRTC from 'services/WebRTC';

const mapStateToProps = (state, props) => {
	return {
    localUserSettings: getLocalUserSettings(state)
	}
};

const mapDispatchToProps = {
};

@connect(mapStateToProps, mapDispatchToProps)
class MeetingRoomContainer extends React.Component {
  get everyDevicesActive() {
    return path(['video', 'active'], this.localUserSettings) && path(['audio', 'active'], this.localUserSettings);
  }

  componentDidMount() {
    // serviceWebRTC.getUserMedia()
  }

  render() {
    return (
      <React.Fragment>
        {/* {!this.everyDevicesActive && (
          <AskDevice
        )} */}
      </React.Fragment>
    )
  }
}

export default MeetingRoomContainer