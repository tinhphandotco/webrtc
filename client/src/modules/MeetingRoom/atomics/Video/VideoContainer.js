import React from 'react';
import { StyledVideo } from './styled';
import { ParticipantsContainer } from './atomics';

class VideoContainer extends React.Component {
  render() {
    return  (
      <StyledVideo>
        <StyledVideo.Participants>
          <ParticipantsContainer />
        </StyledVideo.Participants>
      </StyledVideo>
    );
  }
}

export default VideoContainer;