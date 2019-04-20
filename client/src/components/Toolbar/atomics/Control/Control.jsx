import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Tooltip } from 'antd';
import MyIcon from 'elements/MyIcon';
import StyledControl from './styled';

export default
class Toolbar extends React.Component {
  static propTypes = {
    settings: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { settings } = this.props;

    return (
      <StyledControl>
        <StyledControl.DeviceControl disabled={!settings.audio.active}>
          <MyIcon type={settings.audio.enable ? 'iconmic' : 'iconmic_off'} />
        </StyledControl.DeviceControl>

        <Tooltip placement="top" title="Exit from room" mouseLeaveDelay={0}>
          <StyledControl.LeaveControl>
            <Icon type="close" />
          </StyledControl.LeaveControl>
        </Tooltip>

        <StyledControl.DeviceControl disabled={!settings.video.active}>
          <MyIcon type={settings.video.enable ? 'iconcamera' : 'iconcamera-off'} />
        </StyledControl.DeviceControl>
      </StyledControl>
    );
  }
}
