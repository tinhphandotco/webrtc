import styled from 'styled-components';

const LoginModal = styled.div`
  position: relative;
`;

LoginModal.Title = styled.h2`
  color: #333;
  margin-bottom: 30px;
`;

LoginModal.Form = styled.form`
  display: block;
`;

LoginModal.Label = styled.span`
  color: rgb(86, 99, 122);
  display: block;
  margin-bottom: 5px;
`;

LoginModal.InputWrapper = styled.div`
  display: block;
`;

LoginModal.Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
`;

export default LoginModal;