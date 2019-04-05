import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import io from 'socket.io-client';
import { SOCKET_URL } from 'config';

import { getLocalUserInfo, didGetUserMedia } from 'reducers/participants/select';
import { didConnectToSocket } from 'reducers/room/select';

import { ParticipantsEnhancerActions, ParticipantsActions } from 'actions';

// import {
//   message,
// } from 'antd';

import {
  Toolbar,
  Participants,
  Chat,
} from 'components';

import { AskActiveDevices } from './atomics';

import { StyledRoom } from './styled';

const mapStateToProps = (state) => {
	return {
    localUserInfo: getLocalUserInfo(state),
    didGetUserMedia: didGetUserMedia(state),
    didConnectToSocket: didConnectToSocket(state)
	};
};

const { getUserMedia } = ParticipantsActions;
const { enhancerSetLocalStream, enhancerGetLocalStream } = ParticipantsEnhancerActions;
const mapDispatchToProps = {
  getUserMedia,
  enhancerSetLocalStream,
  enhancerGetLocalStream
};

@connect(mapStateToProps, mapDispatchToProps)
class MeetingRoomContainer extends React.Component {
  static propTypes = {
    enhancerSetLocalStream: PropTypes.func,
    getUserMedia: PropTypes.func,
    localUserInfo: PropTypes.object,
    match: PropTypes.object.isRequired,
    didGetUserMedia: PropTypes.bool,
    didConnectToSocket: PropTypes.bool,
  }

  static defaultProps = {
    getUserMedia: () => null,
    enhancerSetLocalStream: () => null,
    localUserInfo: {},
    didGetUserMedia: false,
    didConnectToSocket: false
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // NOTE: If join room from enter form
    if (this.props.didConnectToSocket) {
      this.props.getUserMedia({ video: true, audio: true });
    }

    // this.props.getUserMedia({ video: true, audio: true });
    // const { roomName } = this.props.match.params;
    // serviceWebRTC.joinRoom(roomName)
    //   .then(() => serviceWebRTC.getUserMedia({ video: true, audio: true }))
    //   .then((stream) => {
    //     this.props.enhancerSetLocalStream(this.props.localUserInfo.id, stream);
    //   })
    //   .catch((error) => {
    //     message.warning(error.name);
    //   })
    //   .finally(() => {
    //     serviceWebRTC.peerConnected();

    //     this.setState({
    //       readyToMeeting: true
    //     });
    //   });
  }

  componentDidUpdate(prevProps) {
    // NOTE: If join room from url link, user need wait for connection to socket.io first
    if (prevProps.didConnectToSocket === false && this.props.didConnectToSocket === true) {
      this.props.getUserMedia({ video: true, audio: true });
    }
  }

  render() {
    return (
      <React.Fragment>
        {!this.props.didGetUserMedia && (
          <AskActiveDevices />
        )}

        {this.props.didGetUserMedia && (
          <StyledRoom>
            <Toolbar />
            <Participants />
            <Chat />
          </StyledRoom>
        )}
      </React.Fragment>
    );
  }
}

export default MeetingRoomContainer;