import styled from 'styled-components';

const Video = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

Video.Participants = styled.div`
  background: red;
  flex-basis: 1px;
  flex-grow: 1;
  overflow: hidden;
`;

export default Video;