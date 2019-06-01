import React from 'react';
import PropTypes from 'prop-types';

import { Tooltip, Popover } from 'antd';

import Infor from './Infor';

import { StyledToolbar } from '../styled';

export default
class RightActions extends React.Component {
  static propTypes = {
    openModalSettings: PropTypes.func,
    updatePassword: PropTypes.func.isRequired,
    settingDevices: PropTypes.object.isRequired,
    // eslint-disable-next-line react/require-default-props
    roomPassword: PropTypes.string,
  }

  static defaultProps = {
    openModalSettings: () => {},
  }

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    const diffVideoActive = this.props.settingDevices.video.active !== nextProps.settingDevices.video.active;
    const diffAudioActive = this.props.settingDevices.audio.active !== nextProps.settingDevices.audio.active;
    const diffRoomPassword = this.props.roomPassword !== nextProps.roomPassword;

    return diffVideoActive || diffAudioActive || diffRoomPassword;
  }

  render() {
    const { settingDevices, openModalSettings } = this.props;

    return (
      <React.Fragment>
        <Tooltip
          mouseLeaveDelay={0}
          placement="top"
          title={(
            !settingDevices.video.active && !settingDevices.audio.active
              ? "Permission not granted"
              : "Setting microphone, camera, speaker"
          )}
        >
          <StyledToolbar.ActionItem
            onClick={openModalSettings}
            disabled={!settingDevices.video.active && !settingDevices.audio.active}
          >
            <StyledToolbar.ActionIcon type="setting" />
            <StyledToolbar.ActionLabel>Settings</StyledToolbar.ActionLabel>
          </StyledToolbar.ActionItem>
        </Tooltip>

        <Popover
          placement="topRight"
          trigger="click"
          content={
            <Infor password={this.props.roomPassword} updatePassword={this.props.updatePassword} />
          }
        >
          <StyledToolbar.ActionItem>
            <StyledToolbar.ActionIcon type="info-circle" />
            <StyledToolbar.ActionLabel>Info</StyledToolbar.ActionLabel>
          </StyledToolbar.ActionItem>
        </Popover>
      </React.Fragment>
    );
  }
}
