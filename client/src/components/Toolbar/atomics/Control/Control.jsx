import React from 'react';
import { Icon } from 'antd';
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
        <StyledControl.LeaveControl>
          <Icon type="close" />
        </StyledControl.LeaveControl>
        <StyledControl.DeviceControl>
          <Icon type="video-camera" />
        </StyledControl.DeviceControl>
      </StyledControl>
    );
  }
}
