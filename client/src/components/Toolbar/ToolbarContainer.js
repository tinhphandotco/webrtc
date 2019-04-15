import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { UIStateActions, ParticipantsActions, ParticipantsEnhancerActions } from 'actions';
import { isSharingScreen } from 'reducers/participants/select';
import { isShowChat, isShowToolbar } from 'reducers/uiState/select';

import ToolbarComponent from './ToolbarComponent';

const mapStateToProps = (state) => {
	return {
    isShowChat: isShowChat(state),
    isShowToolbar: isShowToolbar(state),
    isSharingScreen: isSharingScreen(state),
	};
};

const mapDispatchToProps = {
  toggleChat: UIStateActions.toggleChat,
  toggleToolbar: UIStateActions.toggleToolbar,
  getShareScreen: ParticipantsActions.getShareScreen,
  closeShareScreen: ParticipantsActions.closeShareScreen,
  enhancerIsSharingScreen: ParticipantsEnhancerActions.enhancerIsSharingScreen
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
    enhancerIsSharingScreen: PropTypes.func,
  }

  static defaultProps = {
    toggleChat: () => null,
    toggleToolbar: () => null,
    getShareScreen: () => null,
    closeShareScreen: () => null,
    enhancerIsSharingScreen: () => false
  }

  constructor(props) {
    super(props);
  }

  get isSharingScreen() {
    return this.props.enhancerIsSharingScreen();
  }

  toggleShareCreen = () => {
    if (this.isSharingScreen) {
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

  render() {
    return (
      <ToolbarComponent
        isShowChat={this.props.isShowChat}
        isShowToolbar={this.props.isShowToolbar}
        toggleChat={this.toggleChat}
        toggleToolbar={this.toggleToolbar}
        toggleShareCreen={this.toggleShareCreen}
        getShareScreen={this.props.getShareScreen}
        isSharingScreen={this.isSharingScreen}
      />
    );
  }
}
