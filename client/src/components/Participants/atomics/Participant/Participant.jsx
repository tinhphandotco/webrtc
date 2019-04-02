import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import StyledParticipantItem from './styled';

export default class Participant extends React.Component {
  static propTypes = {
    stream: PropTypes.any,
  }

  static defaultProps = {
    stream: null
  }

  constructor(props) {
    super(props);

    this.state = {
      isShowInfo: false
    };
  }

  toggleInfo = state => () => {
    this.setState({
      isShowInfo: state
    });
  }

  render() {
    return (
      <StyledParticipantItem
        onMouseEnter={this.toggleInfo(true)}
        onMouseLeave={this.toggleInfo(false)}
        selected={false}
        showInfo={this.state.isShowInfo}
      >
        <StyledParticipantItem.Video srcObject={this.props.stream} playsInline autoPlay muted />

        <StyledParticipantItem.Actions>
          <span>C</span>
          <span>A</span>
          <StyledParticipantItem.Devices>
            <StyledParticipantItem.DeviceItem>
              <Icon type="phone" />
            </StyledParticipantItem.DeviceItem>
            <StyledParticipantItem.DeviceItem>
              <Icon type="video-camera" />
            </StyledParticipantItem.DeviceItem>
          </StyledParticipantItem.Devices>
        </StyledParticipantItem.Actions>

        <StyledParticipantItem.UserInfo>
          <StyledParticipantItem.Username>Name</StyledParticipantItem.Username>
        </StyledParticipantItem.UserInfo>

        <StyledParticipantItem.VideoInactive>
          <StyledParticipantItem.VideoInactiveAvatar src="https://www.ischool.berkeley.edu/sites/default/files/styles/fullscreen/public/default_images/avatar.jpeg?itok=x4ls-bFQ" />
        </StyledParticipantItem.VideoInactive>
      </StyledParticipantItem>
    );
  }
}
