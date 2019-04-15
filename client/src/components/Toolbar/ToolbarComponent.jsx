import React from 'react';
import PropTypes from 'prop-types';
import Caret from 'elements/Caret';
import {
  LeftActions, RightActions, Control,
} from './atomics';
import { StyledToolbar } from './styled';

export default class ToolbarComponent extends React.Component {
  static propTypes = {
    isShowChat: PropTypes.bool.isRequired,
    isShowToolbar: PropTypes.bool.isRequired,
    toggleChat: PropTypes.func.isRequired,
    toggleToolbar: PropTypes.func.isRequired,
    toggleShareCreen: PropTypes.func.isRequired,
    isSharingScreen: PropTypes.bool.isRequired
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StyledToolbar hiding={!this.props.isShowToolbar}>
        <StyledToolbar.TogglerWrapper>
          <StyledToolbar.Toggler onClick={this.props.toggleToolbar}>
            <Caret direction={this.props.isShowToolbar ? 'down' : 'up'} />
          </StyledToolbar.Toggler>
        </StyledToolbar.TogglerWrapper>

        <StyledToolbar.Actions>
          <LeftActions
            toggleChat={this.props.toggleChat}
            toggleShareCreen={this.props.toggleShareCreen}
            isSharingScreen={this.props.isSharingScreen}
          />
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
