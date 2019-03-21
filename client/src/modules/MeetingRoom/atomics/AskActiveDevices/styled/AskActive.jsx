import styled from 'styled-components';

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  background: #474747;
  min-height: 100vh;
`;

export const Content = styled.div`
  background: #7a7a7a;
  color: #fff;
  padding: 40px;
`;

export const Icons = styled.div`
  margin-bottom: 20px;
  text-align: center;

  > i {
    font-size: 40px;
    margin: 0 15px;
  }
`; 

export const Title = styled.h3`
  border-bottom: 1px solid #fff;
  color: #fff;
  letter-spacing: 3px;
  padding-bottom: 17px;
`;

export const Note = styled.p`
  color: #fff;
  letter-spacing: 1px;
  margin-bottom: 0;
  margin-top: 25px;
  text-align: center;
`;