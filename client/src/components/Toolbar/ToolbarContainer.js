import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import { UIStateActions, ParticipantsActions, RoomActions } from 'actions';
import { isSharingScreen, localParticipantSettings, getLocalUserInfo } from 'reducers/participants/select';
import { isShowChat, isShowToolbar } from 'reducers/uiState/select';
import { getRoomPassword } from 'reducers/room/select';

import ToolbarComponent from './ToolbarComponent';

const mapStateToProps = (state) => {
	return {
    isShowChat: isShowChat(state),
    isShowToolbar: isShowToolbar(state),
    isSharingScreen: isSharingScreen(state),
    localParticipantInfo: getLocalUserInfo(state),
    localParticipantSettings: localParticipantSettings(state),
    roomPassword: getRoomPassword(state),
	};
};

const mapDispatchToProps = {
  toggleChat: UIStateActions.toggleChat,
  toggleToolbar: UIStateActions.toggleToolbar,
  getShareScreen: ParticipantsActions.getShareScreen,
  closeShareScreen: ParticipantsActions.closeShareScreen,
  setLocalSettingDevices: ParticipantsActions.setLocalSettingDevices,
  leaveRoom: RoomActions.leaveRoom,
  updatePassword: RoomActions.updatePassword
};

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class ToolbarContainer extends React.Component {
  static propTypes = {
    isShowChat: PropTypes.bool.isRequired,
    isShowToolbar: PropTypes.bool.isRequired,
    toggleChat: PropTypes.func,
    toggleToolbar: PropTypes.func,
    getShareScreen: PropTypes.func,
    closeShareScreen: PropTypes.func,
    isSharingScreen: PropTypes.bool.isRequired,
    localParticipantInfo: PropTypes.object,
    setLocalSettingDevices: PropTypes.func,
    updatePassword: PropTypes.func,
    leaveRoom: PropTypes.func,
    history: PropTypes.object.isRequired,
  }

  static defaultProps = {
    toggleChat: () => null,
    toggleToolbar: () => null,
    getShareScreen: () => null,
    closeShareScreen: () => null,
    setLocalSettingDevices: () => null,
    leaveRoom: () => null,
    localParticipantInfo: {},
    updatePassword: () => null,
  }

  constructor(props) {
    super(props);
  }

  get localParticipantSettings() {
    return this.props.localParticipantInfo.settings;
  }

  toggleShareCreen = () => {
    if (this.props.isSharingScreen) {
      this.props.closeShareScreen();
    } else {
      this.props.getShareScreen();
    }
  }

  toggleChat = () => {
    this.props.toggleChat(!this.props.isShowChat);
  }

  toggleToolbar = () => {
    this.props.toggleToolbar(!this.props.isShowToolbar);
  }

  toggleDevices = (device) => () => {
    this.props.setLocalSettingDevices({
      [device]: {
        enable: !this.localParticipantSettings[device].enable
      }
    });
  }
  toggleAudioDevice = this.toggleDevices('audio');
  toggleVideoDevice = this.toggleDevices('video');

  leaveRoom = () => {
    this.props.leaveRoom();
    this.props.history.push('/');
  }

  render() {
    return (
      <ToolbarComponent
        isShowChat={this.props.isShowChat}
        isShowToolbar={this.props.isShowToolbar}
        toggleChat={this.toggleChat}
        toggleToolbar={this.toggleToolbar}
        toggleShareCreen={this.toggleShareCreen}
        getShareScreen={this.props.getShareScreen}
        isSharingScreen={this.props.isSharingScreen}
        localParticipantSettings={this.localParticipantSettings}
        toggleAudioDevice={this.toggleAudioDevice}
        toggleVideoDevice={this.toggleVideoDevice}
        leaveRoom={this.leaveRoom}
        updatePassword={this.props.updatePassword}
        roomPassword={this.props.roomPassword}
      />
    );
  }
}
