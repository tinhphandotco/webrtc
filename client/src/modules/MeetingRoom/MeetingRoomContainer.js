import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { getLocalUserInfo, didGetUserMedia, errorGetUserMedia } from 'reducers/participants/select';
import { isShowGridParticipants } from 'reducers/uiState/select';

import { ParticipantsEnhancerActions, ParticipantsActions, RoomActions } from 'actions';

import {
  message,
} from 'antd';

import {
  Toolbar,
  Participants,
  Chat,
  FullscreenParticipant,
} from 'components';

import { AskActiveDevices } from './atomics';

import { StyledRoom } from './styled';

const mapStateToProps = (state) => {
	return {
    localUserInfo: getLocalUserInfo(state),
    didGetUserMedia: didGetUserMedia(state),
    errorGetUserMedia: errorGetUserMedia(state),
    isShowGridParticipants: isShowGridParticipants(state)
	};
};

const { getUserMedia } = ParticipantsActions;
const { enhancerSetLocalStream, enhancerGetLocalStream } = ParticipantsEnhancerActions;
const { joinRoom, connectSocket } = RoomActions;
const mapDispatchToProps = {
  getUserMedia,
  enhancerSetLocalStream,
  enhancerGetLocalStream,
  joinRoom,
  connectSocket
};

@connect(mapStateToProps, mapDispatchToProps)
class MeetingRoomContainer extends React.Component {
  static propTypes = {
    enhancerSetLocalStream: PropTypes.func,
    getUserMedia: PropTypes.func,
    connectSocket: PropTypes.func,
    joinRoom: PropTypes.func,
    localUserInfo: PropTypes.object,
    match: PropTypes.object.isRequired,
    didGetUserMedia: PropTypes.bool.isRequired,
    errorGetUserMedia: PropTypes.any,
    isShowGridParticipants: PropTypes.bool.isRequired
  }

  static defaultProps = {
    getUserMedia: () => null,
    connectSocket: () => null,
    enhancerSetLocalStream: () => null,
    joinRoom: () => null,
    localUserInfo: null,
    errorGetUserMedia: null
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.connectSocket();
  }

  componentDidUpdate(prevProps) {
    // NOTE: Need to getUserMedia --> got localStream ---> joinRoom() --> attach localStream to peerConnection
    if (!prevProps.localUserInfo && this.props.localUserInfo) {
      this.props.getUserMedia({ video: true, audio: true });
    }

    if (!prevProps.errorGetUserMedia && this.props.errorGetUserMedia) {
      message.warning(this.props.errorGetUserMedia.name);
    }

    if (!prevProps.didGetUserMedia && this.props.didGetUserMedia) {
      this.props.joinRoom(this.props.match.params.roomName);
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
            {!this.props.isShowGridParticipants && (
              <FullscreenParticipant />
            )}
          </StyledRoom>
        )}
      </React.Fragment>
    );
  }
}

export default MeetingRoomContainer;