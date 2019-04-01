import React from 'react';
import { Checkbox } from 'antd';
import MyIcon from 'elements/MyIcon';
import StyledInputBox from './styled';

export default
class InputBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StyledInputBox>
        <StyledInputBox.Control>
          <StyledInputBox.Emotion>
            <span role="img" aria-label="😃">😃</span>
          </StyledInputBox.Emotion>
          <StyledInputBox.Actions>
            <Checkbox>Enter to send</Checkbox>
            <StyledInputBox.Send>
              <MyIcon type="iconfasong" />
              <span>ださ</span>
            </StyledInputBox.Send>
          </StyledInputBox.Actions>
        </StyledInputBox.Control>

        <StyledInputBox.InputWrapper>
          <StyledInputBox.Input />
        </StyledInputBox.InputWrapper>
      </StyledInputBox>
    );
  }
}
