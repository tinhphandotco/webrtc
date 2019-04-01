import React from 'react';
import Caret from 'elements/Caret';
import {
  LeftActions, RightActions, Control,
} from './atomics';
import { StyledToolbar } from './styled';

export default class ToolbarComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowToolbar: true,
    };
  }

  toggleToolbar = () => {
    this.setState((prevState) => ({
      isShowToolbar: !prevState.isShowToolbar
    }));
  }

  render() {
    return (
      <StyledToolbar hiding={!this.state.isShowToolbar}>
        <StyledToolbar.Toggler onClick={this.toggleToolbar}>
          <Caret direction={this.state.isShowToolbar ? 'down' : 'up'} />
        </StyledToolbar.Toggler>

        <StyledToolbar.Actions>
          <LeftActions />
        </StyledToolbar.Actions>

        <StyledToolbar.Controls>
          <Control />
        </StyledToolbar.Controls>

        <StyledToolbar.Actions>
          <RightActions />
        </StyledToolbar.Actions>
      </StyledToolbar>
    );
  }
}
