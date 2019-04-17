import styled from 'styled-components';

const CheckMic = styled.div`
  background: linear-gradient(135deg, #0b7, #c5e228, #fe1, #e6560c);
  border-radius: 4px;
  height: 8px;
  position: relative;
`;

CheckMic.Progress = styled.div.attrs({
  style: ({ progress }) => ({
    width: `${progress}%`,
  }),
})`
  background: #d8d8d8;
  bottom: 0;
  position: absolute;
  top: 0;
  right: 0;
`;

export default CheckMic;