import React from 'react';
import PropTypes from 'prop-types';
import { staticUrl } from 'utils/common';
import MyIcon from 'elements/MyIcon';
import StyledParticipantItem from './styled';

export default class Participant extends React.Component {
  static propTypes = {
    participant: PropTypes.object,
    selected: PropTypes.bool.isRequired,
    handleSelectParticipant: PropTypes.func,
    isLocalParticipant: PropTypes.bool.isRequired,
    sinkId: PropTypes.string,
    settingDevices: PropTypes.object.isRequired
  }

  static defaultProps = {
    participant: {},
    handleSelectParticipant: () => null,
    sinkId: '',
  }

  constructor(props) {
    super(props);

    this.state = {
      isShowInfo: false
    };
  }

  get dontHasVideo() {
    return (
      !this.props.participant.stream
      || (
        this.props.participant.stream && !this.props.settingDevices.video.enable
      )
    );
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
    const { settingDevices } = this.props;

    return (
      <StyledParticipantItem
        onMouseEnter={this.toggleInfo(true)}
        onMouseLeave={this.toggleInfo(false)}
        onClick={this.handleSelectParticipant}
        selected={this.props.selected}
        showInfo={this.state.isShowInfo}
      >
        <StyledParticipantItem.Video
          hiding={this.dontHasVideo}
          sinkId={this.props.sinkId}
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
              <MyIcon type={settingDevices.audio.enable ? 'iconmic' : 'iconmic_off'} />
            </StyledParticipantItem.DeviceItem>
            <StyledParticipantItem.DeviceItem>
              <MyIcon type={settingDevices.video.enable ? 'iconcamera' : 'iconcamera-off'} />
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

        <If condition={this.dontHasVideo}>
          <StyledParticipantItem.VideoInactive>
            <StyledParticipantItem.VideoInactiveAvatar src={staticUrl('assets/images/avatar-default.svg')} />
          </StyledParticipantItem.VideoInactive>
        </If>
      </StyledParticipantItem>
    );
  }
}
