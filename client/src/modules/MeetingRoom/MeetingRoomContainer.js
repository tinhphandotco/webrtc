import React from "react";
import { connect } from "react-redux";

import path from 'ramda/src/path';

import * as serviceWebRTC from 'services/WebRTC';

import { getLocalUserInfo } from 'reducers/users/select';

import { UsersActions, ConnectionActions } from 'actions';

import {
  Input,
  message,
} from 'antd';
import { Button } from 'components';

import { AskActiveDevices, ChatContainer, VideoContainer } from './atomics';

import { StyledRoom } from './styled';

const mapStateToProps = (state, props) => {
	return {
    localUserInfo: getLocalUserInfo(state)
	}
};

const mapDispatchToProps = {
  enhancerSetLocalStream: ConnectionActions.enhancerSetLocalStream,
  enhancerGetLocalStream: ConnectionActions.enhancerGetLocalStream
};

@connect(mapStateToProps, mapDispatchToProps)
class MeetingRoomContainer extends React.Component {
  get everyDevicesActive() {
    return path(['video', 'active'], this.localUserSettings) && path(['audio', 'active'], this.localUserSettings);
  }

  constructor(props) {
    super(props);

    this.connectionEnhancer = {
      localStream: null,
    };

    this.state = {
      readyToMeeting: false
    };
  }

  componentDidMount() {
    serviceWebRTC.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        this.props.enhancerSetLocalStream(this.props.localUserInfo.id, stream);
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

  componentDidUpdate(prevProps) {
    if (
      this.props.localUserInfo.localStream !== prevProps.localUserInfo.localStream
      && this.props.enhancerGetLocalStream()
    ) {
      // this.connectionEnhancer.localStream = this.props.enhancerGetLocalStream();
      // this.$video.srcObject = this.connectionEnhancer.localStream;
      // this.$video.play()
    }
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
    )
  }
}

export default MeetingRoomContainer