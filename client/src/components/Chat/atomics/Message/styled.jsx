import styled, { css } from 'styled-components';

const Message = styled.div`
  align-items: flex-end;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  margin-bottom: 20px;

  ${props => props.me && css`
    flex-direction: row-reverse;

    ${Message.Avatar} {
      margin-left: 10px;
    }

    ${Message.Main} {
      padding-left: 0;
      padding-right: 10px;
    }

    ${Message.Text} {
      background-color: #dfecf9;

      &:before {
        border-bottom: 10px solid #dfecf9;
        border-right: 10px solid transparent;
        border-left: none;
        left: auto;
        transform: translateX(100%);
        right: 0;
      }

      &:after {
        display: none;
      }
    }
  `}

  ${props => props.other && css`
    ${Message.Avatar} {
      margin-right: 10px;
    }

    ${Message.Main} {
      padding-left: 10px;
      padding-right: 0;
    }

    ${Message.Text} {
      background-color: #fff;
      border: 1px solid #f0f0f0;

      &:before {
        border-bottom: 10px solid #f0f0f0;
        border-left: 10px solid transparent;
        border-right: none;
        left: 0;
        transform: translateX(-100%);
        right: auto;
      }

      &:after {
        border-bottom: 9px solid #fff;
        border-left: 9px solid transparent;
        border-right: none;
        left: 2px;
        transform: translateX(-100%);
      }
    }
  `}
`;

Message.Time = styled.div`
  color: #999999;
  display: block;
  font-size: 10px;
  margin-top: 7px;
  text-align: right;
  width: 100%;
`;

Message.Text = styled.div`
  border-radius: 10px;
  line-height: 20px;
  min-height: 30px;
  padding: 10px 15px;
  position: relative;
  word-break: break-word;
  word-wrap: break-word;

  &:before {
    bottom: 10px;
    content: '';
    height: 0;
    position: absolute;
    width: 0;
  }

  &:after {
    bottom: 11px;
    content: '';
    height: 0;
    position: absolute;
    width: 0;
  }
`;

Message.Main = styled.div`
  max-width: calc(100% - 0px);
  min-width: 150px;
  overflow: hidden;
  position: relative;
`;

Message.Avatar = styled.img`
  border-radius: 50%;
  flex-shrink: 0;
  height: 35px;
  margin-bottom: 20px;
  object-fit: cover;
  width: 35px;
`;

export default Message;