import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { UIStateActions } from 'actions';
import { isShowChat, isShowToolbar } from 'reducers/uiState/select';

import ToolbarComponent from './ToolbarComponent';

const mapStateToProps = (state) => {
	return {
    isShowChat: isShowChat(state),
    isShowToolbar: isShowToolbar(state)
	};
};

const mapDispatchToProps = {
  toggleChat: UIStateActions.toggleChat,
  toggleToolbar: UIStateActions.toggleToolbar
};

@connect(mapStateToProps, mapDispatchToProps)
export default class ToolbarContainer extends React.Component {
  static propTypes = {
    isShowChat: PropTypes.bool,
    isShowToolbar: PropTypes.bool,
    toggleChat: PropTypes.func,
    toggleToolbar: PropTypes.func,
  }

  static defaultProps = {
    isShowChat: false,
    isShowToolbar: false,
    toggleChat: () => null,
    toggleToolbar: () => null,
  }

  constructor(props) {
    super(props);
  }

  toggleChat = () => {
    this.props.toggleChat(!this.props.isShowChat);
  }

  render() {
    return (
      <ToolbarComponent
        isShowChat={this.props.isShowChat}
        isShowToolbar={this.props.isShowToolbar}
        toggleChat={this.toggleChat}
        toggleToolbar={this.props.toggleToolbar}
      />
    );
  }
}
