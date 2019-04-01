import React from 'react';
import { InputBox } from './atomics';
import StyledChat from './styled';

export default
class Chat extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StyledChat>
        <StyledChat.Messages></StyledChat.Messages>
        <StyledChat.InputBox>
          <InputBox />
        </StyledChat.InputBox>
      </StyledChat>
    );
  }
}
