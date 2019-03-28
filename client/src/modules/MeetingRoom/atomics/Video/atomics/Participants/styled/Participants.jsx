import styled from 'styled-components';
import { Video } from '../atomics';

const Participant = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
`;

Participant.Video = styled(Video)`
  flex-grow: 1;
  height: 100%;
`;

export default Participant;