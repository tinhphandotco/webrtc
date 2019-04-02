import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { InputBox, Message } from './atomics';

import StyledChat from './styled';

import { isShowChat, isShowToolbar } from 'reducers/uiState/select';

const mapStateToProps = (state) => {
	return {
    isShowChat: isShowChat(state),
    isShowToolbar: isShowToolbar(state)
	};
};

const mapDispatchToProps = {

};

@connect(mapStateToProps, mapDispatchToProps)
export default class Chat extends React.Component {
  static propTypes = {
    isShowChat: PropTypes.bool.isRequired,
    isShowToolbar: PropTypes.bool.isRequired,
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);

    const randomIn = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    this.data = Array(15).fill().map(() => ({
      message: Math.random().toString(16).slice(2, 8).repeat(randomIn(1, 15)),
      me: Math.random() <= 0.5,
    }));
  }

  render() {
    return (
      <StyledChat hiding={this.props.isShowChat}>
        <StyledChat.MessagesScrollbar autoHide>
          <StyledChat.Messages>
            {this.data.map(item => (
              <Message key={item.message} data={item} />
            ))}
          </StyledChat.Messages>
        </StyledChat.MessagesScrollbar>
        <StyledChat.InputBox hasToolbarDock={this.props.isShowToolbar}>
          <InputBox />
        </StyledChat.InputBox>
      </StyledChat>
    );
  }
}
