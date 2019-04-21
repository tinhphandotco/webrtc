import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Tooltip } from 'antd';
import MyIcon from 'elements/MyIcon';
import StyledControl from './styled';

export default
class Toolbar extends React.Component {
  static propTypes = {
    settingDevices: PropTypes.object.isRequired,
    toggleAudioDevice: PropTypes.func.isRequired,
    toggleVideoDevice: PropTypes.func.isRequired,
    isSharingScreen: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { settingDevices, isSharingScreen, toggleAudioDevice, toggleVideoDevice } = this.props;

    return (
      <StyledControl>
        <StyledControl.DeviceControl disabled={!settingDevices.audio.active} onClick={toggleAudioDevice}>
          <MyIcon type={settingDevices.audio.enable ? 'iconmic' : 'iconmic_off'} />
        </StyledControl.DeviceControl>

        <Tooltip placement="top" title="Exit from room" mouseLeaveDelay={0}>
          <StyledControl.LeaveControl>
            <Icon type="close" />
          </StyledControl.LeaveControl>
        </Tooltip>

        <StyledControl.DeviceControl disabled={!settingDevices.video.active || isSharingScreen} onClick={toggleVideoDevice}>
          <MyIcon type={settingDevices.video.enable ? 'iconcamera' : 'iconcamera-off'} />
        </StyledControl.DeviceControl>
      </StyledControl>
    );
  }
}
