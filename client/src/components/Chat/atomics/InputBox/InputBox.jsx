import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import MyIcon from 'elements/MyIcon';
import StyledInputBox from './styled';

export default
class InputBox extends React.Component {
  static propTypes = {
    sendChat: PropTypes.func.isRequired,
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);

    this.state = {
      isEnterToSend: false,
      content: ''
    };
  }

  handleChangeCheckbox = (e) => {
    this.setState({
      isEnterToSend: e.target.checked,
    });
  }

  handleChangeInput = (e) => {
    this.setState({
      content: e.target.value
    });
  }

  handlePressEnter = (e) => {
    if (this.state.isEnterToSend || e.shiftKey) {
      e.preventDefault();
      this.sendChat();
    }
  }

  sendChat = () => {
    if (this.state.content) {
      this.props.sendChat(this.state.content);
      this.setState({
        content: ''
      });
    }
  }

  render() {
    return (
      <StyledInputBox>
        <StyledInputBox.Control>
          {/* <StyledInputBox.Emotion>
            <span role="img" aria-label="😃">😃</span>
          </StyledInputBox.Emotion> */}
          <StyledInputBox.Actions>
            <Checkbox
              value={this.state.isEnterToSend}
              onChange={this.handleChangeCheckbox}
            >Enter to send</Checkbox>
            <StyledInputBox.Send onClick={this.sendChat} disabled={!this.state.content}>
              <MyIcon type="iconfasong" />
              <span>Send</span>
            </StyledInputBox.Send>
          </StyledInputBox.Actions>
        </StyledInputBox.Control>

        <StyledInputBox.InputWrapper>
          <StyledInputBox.Input
            value={this.state.content}
            onChange={this.handleChangeInput}
            onPressEnter={this.handlePressEnter}
          />
        </StyledInputBox.InputWrapper>
      </StyledInputBox>
    );
  }
}
