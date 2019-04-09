import styled, { css } from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

const Chat = styled.div`
  background: rgba(245, 247, 249, 0.7);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  display: flex;
  flex-direction: column;
  height: 100%;
  left: 0;
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

Chat.Close = styled.div`
  background: rgba(0, 0, 0, .7);
  bottom: 10px;
  border-radius: 7px;
  color: #fff;
  cursor: pointer;
  opacity: 0;
  padding: 5px 10px;
  position: absolute;
  transform: translate(100%, 100%);
  transition: transform .3s, opacity .3s;
  right: -10px;
  visibility: hidden;

  &:hover {
    background: rgba(0, 0, 0, .9);
  }

  ${props => props.show && `
    opacity: 1;
    transform: translate(100%, 0);
    visibility: visible;
  `}
`;

export default Chat;