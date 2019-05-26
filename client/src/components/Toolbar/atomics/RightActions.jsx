import React from 'react';
import PropTypes from 'prop-types';

import { Tooltip } from 'antd';

import { StyledToolbar } from '../styled';

export default
class RightActions extends React.Component {
  static propTypes = {
    openModalSettings: PropTypes.func,
    settingDevices: PropTypes.object.isRequired,
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

    return diffVideoActive || diffAudioActive;
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

        <Tooltip placement="top" title="Need some help?" mouseLeaveDelay={0}>
          <StyledToolbar.ActionItem>
            <StyledToolbar.ActionIcon type="question-circle" />
            <StyledToolbar.ActionLabel>Help</StyledToolbar.ActionLabel>
          </StyledToolbar.ActionItem>
        </Tooltip>
      </React.Fragment>
    );
  }
}
