import styled, { css } from 'styled-components';

const DeviceControlMixins = css`
  align-items: center;
  border-radius: 50%;
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  height: 50px;
  margin: 0 5px;
  outline: none;
  width: 50px;
`;

const Control = styled.div`
  align-items: center;
  display: flex;
  font-size: 20px;
  height: 100%;
  opacity: 1;
  position: relative;
  transition: opacity .3s;
`;

Control.DeviceControl = styled.button`
  ${DeviceControlMixins}

  background: black;
`;

Control.LeaveControl = styled.button`
  ${DeviceControlMixins}

  background: #d90909;
`;

export default Control;