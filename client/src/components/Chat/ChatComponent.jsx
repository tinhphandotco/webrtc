import React from 'react';
import PropTypes from 'prop-types';

import MyIcon from 'elements/MyIcon';

import { InputBox, Message } from './atomics';

import StyledChat from './styled';

export default class ChatComponent extends React.Component {
  static propTypes = {
    isShowChat: PropTypes.bool.isRequired,
    isShowToolbar: PropTypes.bool.isRequired,
    closeChat: PropTypes.func.isRequired,
    messages: PropTypes.array,
  }

  static defaultProps = {
    messages: [],
  }

  render() {
    return (
      <StyledChat hiding={!this.props.isShowChat}>
        <StyledChat.MessagesScrollbar autoHide>
          <StyledChat.Messages>
            {this.props.messages.map(item => (
              <Message key={item.message} data={item} />
            ))}
          </StyledChat.Messages>
        </StyledChat.MessagesScrollbar>

        <StyledChat.InputBox hasToolbarDock={this.props.isShowToolbar}>
          <InputBox />
        </StyledChat.InputBox>

        <StyledChat.Close show={this.props.isShowChat && !this.props.isShowToolbar} onClick={this.props.closeChat}>
          <MyIcon type="iconchat-off" />
          <span className="u-mgl-10">Close Chat</span>
        </StyledChat.Close>
      </StyledChat>
    );
  }
}
