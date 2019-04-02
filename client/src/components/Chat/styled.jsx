import styled, { css } from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

const Chat = styled.div`
  background: rgba(245, 247, 249, 0.7);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  display: flex;
  flex-direction: column;
  height: 100%;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  transition: transform .3s;
  width: 320px;
  z-index: 5;

  ${props => props.hiding && css`
    transform: translateX(-100%);
  `}
`;

Chat.MessagesScrollbar = styled(Scrollbars)`
  flex-basis: 1px;
  flex-grow: 1;
  padding: 0 15px;
`;

Chat.Messages = styled.div`
  padding: 0 15px;
`;


Chat.InputBox = styled.div`
  background: rgba(255, 255, 255, .7);
  padding: 10px 15px;
  transition: all .3s;

  ${props => props.hasToolbarDock && 'padding-bottom: 95px;'}
`;


export default Chat;