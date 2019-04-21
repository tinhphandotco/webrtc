import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { UIStateActions, ParticipantsActions } from 'actions';
import { isSharingScreen, localParticipantSettings, getLocalUserInfo } from 'reducers/participants/select';
import { isShowChat, isShowToolbar } from 'reducers/uiState/select';

import ToolbarComponent from './ToolbarComponent';

const mapStateToProps = (state) => {
	return {
    isShowChat: isShowChat(state),
    isShowToolbar: isShowToolbar(state),
    isSharingScreen: isSharingScreen(state),
    localParticipantInfo: getLocalUserInfo(state),
    localParticipantSettings: localParticipantSettings(state),
	};
};

const mapDispatchToProps = {
  toggleChat: UIStateActions.toggleChat,
  toggleToolbar: UIStateActions.toggleToolbar,
  getShareScreen: ParticipantsActions.getShareScreen,
  closeShareScreen: ParticipantsActions.closeShareScreen,
  setLocalSettingDevices: ParticipantsActions.setLocalSettingDevices
};

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
  }

  static defaultProps = {
    toggleChat: () => null,
    toggleToolbar: () => null,
    getShareScreen: () => null,
    closeShareScreen: () => null,
    setLocalSettingDevices: () => null,
    localParticipantInfo: {},
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
      />
    );
  }
}
