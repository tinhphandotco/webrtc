import React from 'react';
import { StyledToolbar } from '../styled';

export default
class RightActions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <StyledToolbar.ActionItem>
          <StyledToolbar.ActionIcon type="setting" />
          <StyledToolbar.ActionLabel>Settings</StyledToolbar.ActionLabel>
        </StyledToolbar.ActionItem>

        <StyledToolbar.ActionItem>
          <StyledToolbar.ActionIcon type="question-circle" />
          <StyledToolbar.ActionLabel>Help</StyledToolbar.ActionLabel>
        </StyledToolbar.ActionItem>
      </React.Fragment>
    );
  }
}
