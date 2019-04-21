import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { staticUrl } from 'utils/common';

import { ParticipantsEnhancerActions } from 'actions';
import { getSelectedParticipant, getParticipantSettingById } from 'reducers/participants/select';

import StyledFullscreenParticipant from './styled';

const mapStateToProps = (state) => {
  const selectedParticipant = getSelectedParticipant(state);
  console.log('selectedParticipant: ', selectedParticipant);

	return {
    selectedParticipant: selectedParticipant,
    settingDevices: getParticipantSettingById(selectedParticipant.id)(state)
	};
};

const { enhancerGetSelectedParticipant } = ParticipantsEnhancerActions;
const mapDispatchToProps = {
  enhancerGetSelectedParticipant: enhancerGetSelectedParticipant
};

@connect(mapStateToProps, mapDispatchToProps)
export default class FullscreenParticipant extends React.Component {
  static propTypes = {
    selectedParticipant: PropTypes.object,
    enhancerGetSelectedParticipant: PropTypes.func,
    settingDevices: PropTypes.object.isRequired
  }

  static defaultProps = {
    selectedParticipant: {},
    enhancerGetSelectedParticipant: () => null
  }

  get selectedParticipant() {
    return this.props.enhancerGetSelectedParticipant();
  }

  get dontHasVideo() {
    return !this.selectedParticipant.stream || !this.props.settingDevices.video.active || !this.props.settingDevices.video.enable;
  }

  render() {
    console.log('FullscreenParticipant: ', this.props.settingDevices)

    return (
      <StyledFullscreenParticipant>
        <StyledFullscreenParticipant.Video hiding={this.dontHasVideo} srcObject={this.selectedParticipant.stream} playsInline autoPlay muted />
        <If condition={this.dontHasVideo}>
          <StyledFullscreenParticipant.VideoInactive>
            <StyledFullscreenParticipant.VideoInactiveAvatar src={staticUrl('assets/images/avatar-default.svg')} />
          </StyledFullscreenParticipant.VideoInactive>
        </If>
      </StyledFullscreenParticipant>
    );
  }
}