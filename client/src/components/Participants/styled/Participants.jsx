import styled, { css } from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

const HeaderActionMixin = css`
  background: #333;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  outline: none;
  padding: 5px 7px;
`;

const Participants = styled.div`
  bottom: 0;
  display: flex;
  flex-direction: column;
  padding-right: 30px;
  position: absolute;
  top: 0;
  right: 0;
  width: 250px;
`;

Participants.Header = styled.div`
  align-items: stretch;
  margin: 20px 0;
  display: flex;
`;

Participants.ChangeView = styled.button`
  ${HeaderActionMixin}

  flex-grow: 8;
  flex-basis: 1px;
`;

Participants.Toggler = styled.button`
  ${HeaderActionMixin}

  flex-grow: 2;
  flex-basis: 1px;
  margin-left: 10px;
`;

Participants.List = styled(Scrollbars)`
  flex-basis: 1px;
  flex-grow: 1;
  transition: transform .3s, opacity .3s;

  ${props => props.hiding && css`
    transform: translateX(100%);
    opacity: 0;
  `}
`;

export default Participants;