import styled from 'styled-components';
import { Form as FormAntd } from 'antd';

const ConnectRoom = styled.div`
  background: linear-gradient(-90deg,#1251AE 0,#0074FF 50%,#1251AE 100%);
  min-height: 100vh;
  padding: 0.1px;
`;

ConnectRoom.EnterRoom = styled.div`
  background-color: #fff;
  max-width: 80%;
  margin: 50px auto;
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
