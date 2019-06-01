import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { getLocalUserInfo, didGetUserMedia, errorGetUserMedia } from 'reducers/participants/select';
import { isShowGridParticipants } from 'reducers/uiState/select';
import { hasPassword, isLogged } from 'reducers/room/select';

import { ParticipantsActions, RoomActions } from 'actions';

import {
  message, Modal
} from 'antd';

import LoginModal from 'modals/LoginModal';

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
    isShowGridParticipants: isShowGridParticipants(state),
    hasPassword: hasPassword(state),
    isLogged: isLogged(state),
	};
};

const { getUserMedia } = ParticipantsActions;
const { joinRoom, connectSocket } = RoomActions;
const mapDispatchToProps = {
  getUserMedia,
  joinRoom,
  connectSocket
};

@connect(mapStateToProps, mapDispatchToProps)
class MeetingRoomContainer extends React.Component {
  static propTypes = {
    getUserMedia: PropTypes.func,
    connectSocket: PropTypes.func,
    joinRoom: PropTypes.func,
    localUserInfo: PropTypes.object,
    match: PropTypes.object.isRequired,
    didGetUserMedia: PropTypes.bool.isRequired,
    errorGetUserMedia: PropTypes.any,
    isShowGridParticipants: PropTypes.bool.isRequired,
    hasPassword: PropTypes.bool.isRequired,
    isLogged: PropTypes.bool.isRequired
  }

  static defaultProps = {
    getUserMedia: () => null,
    connectSocket: () => null,
    joinRoom: () => null,
    localUserInfo: null,
    errorGetUserMedia: null
  }

  constructor(props) {
    super(props);

    this.state = {
      shouldShowModalLogin: false,
    };
  }

  componentDidMount() {
    this.props.connectSocket();
  }

  componentDidUpdate(prevProps) {
    // NOTE: Need to getUserMedia --> got localStream ---> joinRoom() --> attach localStream to peerConnection
    if (!prevProps.localUserInfo && this.props.localUserInfo) {
      this.props.getUserMedia([
        { video: true, audio: true },
        { video: true },
        { audio: true },
      ]);
    }

    if (!prevProps.errorGetUserMedia && this.props.errorGetUserMedia) {
      message.warning(this.props.errorGetUserMedia.name);
    }

    // NOTE: If room dont have password --> `isLogged = true` but `didGetUserMedia = false`
    // If room have password --> Maybe `didGetUserMedia = true` but `isLogged = false`
    // We need to wait both `didGetUserMedia` and `isLogged` to `true`
    // Because RTCPeerConnection need set localStream first all
    if (
      (prevProps.isLogged !== this.props.isLogged || prevProps.didGetUserMedia !== this.props.didGetUserMedia)
      && this.props.didGetUserMedia && this.props.isLogged
    ) {
      this.setState({
        shouldShowModalLogin: false,
      });
      this.props.joinRoom(this.props.match.params.roomName);
    }

    if (!prevProps.hasPassword && this.props.hasPassword) {
      this.setState({
        shouldShowModalLogin: true,
      });
    }
  }

  render() {
    const didConnectToRoom = this.props.didGetUserMedia;

    return (
      <React.Fragment>
        <Choose>
          <When condition={!didConnectToRoom}>
            <AskActiveDevices />
          </When>

          <When condition={didConnectToRoom}>
            <StyledRoom>
              <Toolbar />
              <Participants />
              <Chat />
              {!this.props.isShowGridParticipants && (
                <FullscreenParticipant />
              )}
            </StyledRoom>
          </When>
        </Choose>

        <Modal
          visible={this.state.shouldShowModalLogin}
          destroyOnClose
          footer={null}
          maskClosable={false}
          closable={false}
        >
          <LoginModal />
        </Modal>
      </React.Fragment>
    );
  }
}

export default MeetingRoomContainer;