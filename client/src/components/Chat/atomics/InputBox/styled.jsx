import styled from 'styled-components';
import { Button, Input } from 'antd';

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

InputBox.Control = styled.div`
  display: flex;
  justify-content: space-between;
`;

InputBox.Emotion = styled.button`
  background: transparent;
  border: none;
  color: #1177ed;
  cursor: pointer;
  font-size: 18px;
  outline: none;
`;

InputBox.Actions = styled.div`
  align-items: center;
  display: flex;
  margin-left: auto;
`;

InputBox.Send = styled(Button).attrs({
  size: 'small',
  type: 'primary',
})`
  margin-left: 15px;
`;

InputBox.InputWrapper = styled.div`
  flex-basis: 1px;
  flex-grow: 1;
  margin-top: 10px;
`;

InputBox.Input = styled(Input.TextArea)`
  resize: none;
`;

export default InputBox;
