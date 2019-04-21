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
  width: 100%;

  ${props => props.hiding && 'display: none'};
`;

FullscreenParticipant.VideoInactive = styled.div`
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  left: 0;
  height: 100%;
  position: absolute;
  top: 0;
  width: 100%;
`;

FullscreenParticipant.VideoInactiveAvatar = styled.img`
  border-radius: 50%;
  height: 40%;
`;

export default FullscreenParticipant;