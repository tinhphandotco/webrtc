import styled from 'styled-components';
import Video from 'elements/Video';

const FullscreenParticipant = styled.div`
  height: 100vh;
  overflow: hidden;
  width: 100vw;
`;

FullscreenParticipant.Video = styled(Video)`
  background: #111;
  height: 100%;
  width: 100%
`;

export default FullscreenParticipant;