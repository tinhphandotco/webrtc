import styled from 'styled-components';

const Chat = styled.div`
  background: rgba(245, 247, 249, 0.8);
  display: flex;
  flex-direction: column;
  height: 100%;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 320px;
`;

Chat.Messages = styled.div`
  flex-basis: 1px;
  flex-grow: 1;
`;

Chat.InputBox = styled.div`
  background: #fff;
  min-height: 190px;
  padding: 15px;
  padding-bottom: 95px;
`;


export default Chat;