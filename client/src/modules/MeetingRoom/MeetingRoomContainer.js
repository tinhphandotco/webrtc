import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { getLocalUserInfo, didGetUserMedia, errorGetUserMedia } from 'reducers/participants/select';
import { getRoomName } from 'reducers/room/select';

import { ParticipantsEnhancerActions, ParticipantsActions, RoomActions } from 'actions';

import {
  message,
} from 'antd';

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
    roomName: getRoomName(state),
    errorGetUserMedia: errorGetUserMedia(state)
	};
};

const { getUserMedia } = ParticipantsActions;
const { enhancerSetLocalStream, enhancerGetLocalStream } = ParticipantsEnhancerActions;
const { joinRoom } = RoomActions;
const mapDispatchToProps = {
  getUserMedia,
  enhancerSetLocalStream,
  enhancerGetLocalStream,
  joinRoom
};

@connect(mapStateToProps, mapDispatchToProps)
class MeetingRoomContainer extends React.Component {
  static propTypes = {
    enhancerSetLocalStream: PropTypes.func,
    getUserMedia: PropTypes.func,
    joinRoom: PropTypes.func,
    localUserInfo: PropTypes.object,
    match: PropTypes.object.isRequired,
    didGetUserMedia: PropTypes.bool,
    errorGetUserMedia: PropTypes.any,
    roomName: PropTypes.string,
  }

  static defaultProps = {
    getUserMedia: () => null,
    enhancerSetLocalStream: () => null,
    joinRoom: () => null,
    localUserInfo: null,
    didGetUserMedia: false,
    roomName: '',
    errorGetUserMedia: null
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // NOTE: If join room from enter form
    if (this.props.localUserInfo) {
      this.props.getUserMedia({ video: true, audio: true });
    }

    if (this.props.didGetUserMedia) {
      this.props.joinRoom(this.props.match.params.roomName);
    }
  }

  componentDidUpdate(prevProps) {
    // NOTE: If join room from url link, user need wait for connection to socket.io first
    if (!prevProps.didGetUserMedia && this.props.didGetUserMedia) {
      this.props.joinRoom(this.props.match.params.roomName);
    }

    if (!prevProps.localUserInfo && this.props.localUserInfo) {
      this.props.getUserMedia({ video: true, audio: true });
    }

    if (!prevProps.errorGetUserMedia && this.props.errorGetUserMedia) {
      message.warning(this.props.errorGetUserMedia.name);
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