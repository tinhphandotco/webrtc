import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import StyledParticipantItem from './styled';

export default class Participant extends React.Component {
  static propTypes = {
    participant: PropTypes.object,
    selected: PropTypes.bool.isRequired,
    handleSelectParticipant: PropTypes.func,
    isLocalParticipant: PropTypes.bool.isRequired
  }

  static defaultProps = {
    participant: {},
    handleSelectParticipant: () => null
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

  handleSelectParticipant = () => {
    if (!this.props.selected) {
      this.props.handleSelectParticipant(this.props.participant.id);
    }
  }

  render() {
    return (
      <StyledParticipantItem
        onMouseEnter={this.toggleInfo(true)}
        onMouseLeave={this.toggleInfo(false)}
        onClick={this.handleSelectParticipant}
        selected={this.props.selected}
        showInfo={this.state.isShowInfo}
      >
        <StyledParticipantItem.Video
          srcObject={this.props.participant.stream}
          playsInline
          autoPlay
          muted={this.props.isLocalParticipant}
        />

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
          <StyledParticipantItem.Username>
            {this.props.isLocalParticipant
              ? 'Me'
              : 'Other'}
          </StyledParticipantItem.Username>
        </StyledParticipantItem.UserInfo>

        <StyledParticipantItem.VideoInactive>
          <StyledParticipantItem.VideoInactiveAvatar src="https://www.ischool.berkeley.edu/sites/default/files/styles/fullscreen/public/default_images/avatar.jpeg?itok=x4ls-bFQ" />
        </StyledParticipantItem.VideoInactive>
      </StyledParticipantItem>
    );
  }
}
