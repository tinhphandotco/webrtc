import styled, { css } from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

const HeaderActionMixin = css`
  background: #333;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  outline: none;
  padding: 5px 10px;
`;

const Participants = styled.div.attrs((props) => {
  const total = props.totalParticipants;
  const participantRowCol = {
    '1': { rows: 1, cols: 1 },
    '2': { rows: 1, cols: 2 },
    '3_4': { rows: 2, cols: 2 },
    '5_6': { rows: 2, cols: 3 },
    '7_9': { rows: 3, cols: 3 },
    '10_12': { rows: 3, cols: 4 },
    '13_16': { rows: 4, cols: 4 },
    '17_20': { rows: 4, cols: 5 },
    '21_25': { rows: 5, cols: 5 },
    '26_30': { rows: 6, cols: 5 },
  };
  const participantStyles = {
    '1': `
      padding: 5% 0;
    `,
    '2': `
      padding: 10% 0;
    `,
    '3_16': `
      padding: 5% 0;
    `,
  };
  const findKey = obj => Object.keys(obj).find((key) => {
    const min = Number(key.split('_').shift());
    const max = Number(key.split('_').pop());
    return total >= min && total <= max;
  });

  const keyRowCol = findKey(participantRowCol);
  const keyStyles = findKey(participantStyles);

  return {
    ...participantRowCol[keyRowCol],
    styles: (participantStyles[keyStyles] || ''),
  };
})`
  bottom: 0;
  display: flex;
  flex-direction: column;
  padding-right: 30px;
  position: absolute;
  top: 0;
  transition: all .3s;
  right: 0;
  width: 250px;

  ${props => props.gridLayout && css`
    background: cadetblue;
    bottom: 0;
    left: 0;
    padding-right: 0;
    top: 0;
    right: 0;
    width: 100%;

    ${props1 => props1.styles}

    ${Participants.Header} {
      padding-right: 30px;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 10;
    }

    ${Participants.ChangeView} {
      flex-basis: auto;
      flex-grow: 0;
      margin-left: auto;
    }

    ${Participants.Toggler} {
      display: none;
    }

    ${Participants.ListScrollbar} {
      > div:first-child {
        margin: 0 !important;
        overflow: hidden !important;
      }
    }

    ${Participants.List} {
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      height: 100%;
      padding: 0 50px;
    }

    ${Participants.Participant} {
      height: ${props1 => `calc(${100 / props1.rows}% - 20px);`}
      margin: 10px;
      width: ${props1 => `calc(${100 / props1.cols}% - 20px);`}
    }
  `}
`;

Participants.Participant = styled.div`
  height: 150px;
  margin-bottom: 15px;
  width: 100%;
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

Participants.ListScrollbar = styled(Scrollbars)`
  flex-basis: 1px;
  flex-grow: 1;
  transition: transform .3s, opacity .3s;

  ${props => props.hiding && css`
    transform: translateX(100%);
    opacity: 0;
  `}
`;

Participants.List = styled.div`
  padding-right: 10px;
`;

export default Participants;