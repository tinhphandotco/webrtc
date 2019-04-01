import React from 'react';
import MyIcon from 'elements/MyIcon';
import { StyledToolbar } from '../styled';

export default
class LeftActions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <StyledToolbar.ActionItem>
          <StyledToolbar.ChatAction>
            <StyledToolbar.ActionBadge>12</StyledToolbar.ActionBadge>
            <MyIcon className="u-fz-24" type="iconchatinput" />
            <StyledToolbar.ActionLabel>Chat</StyledToolbar.ActionLabel>
          </StyledToolbar.ChatAction>
        </StyledToolbar.ActionItem>

        <StyledToolbar.ActionItem>
          <StyledToolbar.ActionIcon type="laptop" />
          <StyledToolbar.ActionLabel>Share screen</StyledToolbar.ActionLabel>
        </StyledToolbar.ActionItem>
      </React.Fragment>
    );
  }
}
