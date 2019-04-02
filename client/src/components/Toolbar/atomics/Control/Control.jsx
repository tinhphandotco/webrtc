import React from 'react';
import { Icon, Tooltip } from 'antd';
import StyledControl from './styled';

export default
class Toolbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StyledControl>
        <StyledControl.DeviceControl>
          <Icon type="phone" />
        </StyledControl.DeviceControl>

        <Tooltip placement="top" title="Exit from room" mouseLeaveDelay={0}>
          <StyledControl.LeaveControl>
            <Icon type="close" />
          </StyledControl.LeaveControl>
        </Tooltip>
        <StyledControl.DeviceControl>
          <Icon type="video-camera" />
        </StyledControl.DeviceControl>
      </StyledControl>
    );
  }
}
