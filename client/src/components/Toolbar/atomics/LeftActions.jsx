import React from 'react';
import PropTypes from 'prop-types';

import { Tooltip } from 'antd';
import MyIcon from 'elements/MyIcon';

import { StyledToolbar } from '../styled';

export default class LeftActions extends React.Component {
  static propTypes = {
    toggleChat: PropTypes.func,
  }

  static defaultProps = {
    toggleChat: () => null,
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Tooltip placement="top" title="Open chat">
          <StyledToolbar.ActionItem onClick={this.props.toggleChat}>
            <StyledToolbar.ChatAction>
              <StyledToolbar.ActionBadge>12</StyledToolbar.ActionBadge>
              <MyIcon className="u-fz-24" type="iconchatinput" />
              <StyledToolbar.ActionLabel>Chat</StyledToolbar.ActionLabel>
            </StyledToolbar.ChatAction>
          </StyledToolbar.ActionItem>
        </Tooltip>

        <Tooltip placement="top" title="Screen sharing is possible">
          <StyledToolbar.ActionItem>
            <StyledToolbar.ActionIcon type="laptop" />
            <StyledToolbar.ActionLabel>Share screen</StyledToolbar.ActionLabel>
          </StyledToolbar.ActionItem>
        </Tooltip>
      </React.Fragment>
    );
  }
}
