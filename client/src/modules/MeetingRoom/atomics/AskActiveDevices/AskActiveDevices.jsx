import React from 'react';
import { StyledAskActive } from './styled';

const AskActiveDevices = () => {
  return (
    <StyledAskActive.Wrapper>
      <StyledAskActive.Content>
        <StyledAskActive.Icons>
          <i className="fas fa-microphone"></i>
          <i className="fas fa-video"></i>
        </StyledAskActive.Icons>
        <StyledAskActive.Title>We needs to use your microphone and camera.</StyledAskActive.Title>
        <StyledAskActive.Note>
          <span>Select </span>
          <strong><em>Allow</em></strong>
          <span> when your browser asks for permissions.</span>
        </StyledAskActive.Note>
      </StyledAskActive.Content>
    </StyledAskActive.Wrapper>
  );
};

export default AskActiveDevices;