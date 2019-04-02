import React from 'react';
import PropTypes from 'prop-types';
import Caret from 'elements/Caret';
import {
  LeftActions, RightActions, Control,
} from './atomics';
import { StyledToolbar } from './styled';

export default class ToolbarComponent extends React.Component {
  static propTypes = {
    isShowChat: PropTypes.bool,
    isShowToolbar: PropTypes.bool,
    toggleChat: PropTypes.func,
    toggleToolbar: PropTypes.func,
  }

  static defaultProps = {
    isShowChat: false,
    isShowToolbar: false,
    toggleChat: () => null,
    toggleToolbar: () => null,
  }

  constructor(props) {
    super(props);
  }

  toggleToolbar = () => {
    this.props.toggleToolbar(!this.props.isShowToolbar);
  }

  render() {
    return (
      <StyledToolbar hiding={!this.props.isShowToolbar}>
        <StyledToolbar.Toggler onClick={this.toggleToolbar}>
          <Caret direction={this.props.isShowToolbar ? 'down' : 'up'} />
        </StyledToolbar.Toggler>

        <StyledToolbar.Actions>
          <LeftActions toggleChat={this.props.toggleChat} />
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
