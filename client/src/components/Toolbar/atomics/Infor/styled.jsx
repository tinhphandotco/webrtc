import styled from 'styled-components';

const Infor = styled.div`
  position: relative;
`;

Infor.Row = styled.div`
  color: rgb(40, 52, 71);
  display: flex;
  margin-bottom: 15px;
`;

Infor.Label = styled.div`
  flex-basis: 100px;
  flex-shrink: 0;
  font-size: 15px;
  font-weight: bold;
`;

Infor.Content = styled.div`
  flex-basis: 1px;
  flex-grow: 1;
  word-break: break-word;
`;

Infor.Actions = styled.div`
  align-items: center;
  display: flex;
`;

Infor.ActionItem = styled.a`
  text-decoration: none !important;
  margin: 0 5px;
`;

Infor.InputGroup = styled.div`
  display: flex;
`;

Infor.InputWrapper = styled.div`
  flex-basis: 1px;
  flex-grow: 1;
`;

Infor.InputActions = styled.div`
  align-items: center;
  display: flex;
  margin-left: 10px;
`;

export default Infor;