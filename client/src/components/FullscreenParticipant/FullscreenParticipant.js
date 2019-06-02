import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { staticUrl } from 'utils/common';

import {
  getSelectedParticipant, getParticipantSettingById
} from 'reducers/participants/select';

import StyledFullscreenParticipant from './styled';

const mapStateToProps = (state) => {
  const selectedParticipant = getSelectedParticipant(state);

	return {
    selectedParticipant: selectedParticipant,
    settingDevices: getParticipantSettingById(selectedParticipant.id)(state)
	};
};

const mapDispatchToProps = {
};

@connect(mapStateToProps, mapDispatchToProps)
export default class FullscreenParticipant extends React.Component {
  static propTypes = {
    selectedParticipant: PropTypes.object.isRequired,
    settingDevices: PropTypes.object.isRequired
  }

  static defaultProps = {
  }

  get dontHasVideo() {
    return (
      !this.props.selectedParticipant.stream
      || (
        this.props.selectedParticipant.stream
        && !this.props.settingDevices.video.enable
        && !this.props.settingDevices.video.isSharingScreen
      )
    );
  }

  render() {
    return (
      <StyledFullscreenParticipant>
        <StyledFullscreenParticipant.Video
          hiding={this.dontHasVideo}
          srcObject={this.props.selectedParticipant.stream}
          playsInline autoPlay muted
        />
        <If condition={this.dontHasVideo}>
          <StyledFullscreenParticipant.VideoInactive>
            <StyledFullscreenParticipant.VideoInactiveAvatar src={staticUrl('assets/images/avatar-default.svg')} />
          </StyledFullscreenParticipant.VideoInactive>
        </If>
      </StyledFullscreenParticipant>
    );
  }
}