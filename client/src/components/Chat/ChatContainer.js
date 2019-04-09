import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { UIStateActions } from 'actions';
import { isShowChat, isShowToolbar } from 'reducers/uiState/select';

import ChatComponent from './ChatComponent';

const mapStateToProps = (state) => {
	return {
    isShowChat: isShowChat(state),
    isShowToolbar: isShowToolbar(state)
	};
};

const mapDispatchToProps = {
  toggleChat: UIStateActions.toggleChat,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class ChatContainer extends React.Component {
  static propTypes = {
    isShowChat: PropTypes.bool.isRequired,
    isShowToolbar: PropTypes.bool.isRequired,
    toggleChat: PropTypes.func,
  }

  static defaultProps = {
    toggleChat: () => null,
  }

  constructor(props) {
    super(props);

    const randomIn = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    this.data = Array(15).fill().map(() => ({
      message: Math.random().toString(16).slice(2, 8).repeat(randomIn(1, 15)),
      me: Math.random() <= 0.5,
    }));
  }

  closeChat = () => {
    this.props.toggleChat(false);
  }

  render() {
    return (
      <ChatComponent
        isShowChat={this.props.isShowChat}
        isShowToolbar={this.props.isShowToolbar}
        closeChat={this.closeChat}
        messages={this.data}
      />
    );
  }
}
