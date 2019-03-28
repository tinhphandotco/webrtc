import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import * as serviceWebRTC from 'services/WebRTC';

import { getLocalUserInfo } from 'reducers/participants/select';

import { ParticipantsEnhancerActions } from 'actions';

import {
  message,
} from 'antd';

import { AskActiveDevices, ChatContainer, VideoContainer } from './atomics';

import { StyledRoom } from './styled';

const mapStateToProps = (state) => {
	return {
    localUserInfo: getLocalUserInfo(state),
	};
};

const mapDispatchToProps = {
  enhancerSetLocalStream: ParticipantsEnhancerActions.enhancerSetLocalStream,
  enhancerGetLocalStream: ParticipantsEnhancerActions.enhancerGetLocalStream,
};

@connect(mapStateToProps, mapDispatchToProps)
class MeetingRoomContainer extends React.Component {
  static propTypes = {
    enhancerSetLocalStream: PropTypes.func,
    localUserInfo: PropTypes.object,
    match: PropTypes.object.isRequired,
  }

  static defaultProps = {
    enhancerSetLocalStream: () => null,
    localUserInfo: {},
  }

  constructor(props) {
    super(props);

    this.state = {
      readyToMeeting: false,
    };
  }

  componentDidMount() {
    const { roomName } = this.props.match.params;
    serviceWebRTC.joinRoom(roomName)
      .then(() => serviceWebRTC.getUserMedia({ video: true, audio: true }))
      .then((stream) => {
        this.props.enhancerSetLocalStream(this.props.localUserInfo.id, stream);
      })
      .catch((error) => {
        message.warning(error.name);
      })
      .finally(() => {
        serviceWebRTC.peerConnected();

        this.setState({
          readyToMeeting: true
        });
      });
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.readyToMeeting && (
          <AskActiveDevices />
        )}

        {this.state.readyToMeeting && (
          <StyledRoom.Wrapper>
            <StyledRoom.Video>
              <VideoContainer />
            </StyledRoom.Video>
            <StyledRoom.Chat>
              <ChatContainer />
            </StyledRoom.Chat>
          </StyledRoom.Wrapper>
        )}
      </React.Fragment>
    );
  }
}

export default MeetingRoomContainer;