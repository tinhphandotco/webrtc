import styled from 'styled-components';
import { Form as FormAntd } from 'antd';

const ConnectRoom = styled.div`
  align-items: center;
  background: linear-gradient(-90deg,#1251AE 0,#0074FF 50%,#1251AE 100%);
  display: flex;
  justify-content: center;
  min-height: 100vh;
  padding: 0.1px;
`;

ConnectRoom.EnterRoom = styled.div`
  background-color: #fff;
  max-width: 80%;
  padding: 25px 30px;
  width: 680px;
  z-index: 2;
`;

ConnectRoom.Form = styled(FormAntd)`
  align-items: center;
  display: flex;
  width: 100%;
`;

export default ConnectRoom;
