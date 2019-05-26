import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { UIStateActions, ChatActions} from 'actions';
import { isShowChat, isShowToolbar } from 'reducers/uiState/select';
import { getListMessages } from 'reducers/chat/select';

import ChatComponent from './ChatComponent';

const mapStateToProps = (state) => {
	return {
    isShowChat: isShowChat(state),
    isShowToolbar: isShowToolbar(state),
    listMessages: getListMessages(state),
	};
};

const mapDispatchToProps = {
  toggleChat: UIStateActions.toggleChat,
  sendChat: ChatActions.sendChat
};

@connect(mapStateToProps, mapDispatchToProps)
export default class ChatContainer extends React.Component {
  static propTypes = {
    isShowChat: PropTypes.bool.isRequired,
    isShowToolbar: PropTypes.bool.isRequired,
    toggleChat: PropTypes.func,
    sendChat: PropTypes.func,
    listMessages: PropTypes.array,
  }

  static defaultProps = {
    listMessages: [],
    toggleChat: () => null,
    sendChat: () => null,
  }

  shouldComponentUpdate(nextProps) {
    const diffIsShowChat = this.props.isShowChat !== nextProps.isShowChat;
    const diffIsShowToolbar = this.props.isShowToolbar !== nextProps.isShowToolbar;
    const diffListMessages = this.props.listMessages !== nextProps.listMessages;

    return diffIsShowChat || diffIsShowToolbar || diffListMessages;
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
        sendChat={this.props.sendChat}
        messages={this.props.listMessages}
      />
    );
  }
}
