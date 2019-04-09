import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { ParticipantsEnhancerActions, UIStateActions } from 'actions';
import { getLocalUserInfo, getAllStreams } from 'reducers/participants/select';
import { isShowGridParticipants } from 'reducers/uiState/select';

import ParticipantsComponent from './ParticipantsComponent';

const mapStateToProps = (state) => {
	return {
    allStreams: getAllStreams(state),
    localUserInfo: getLocalUserInfo(state),
    isShowGridParticipants: isShowGridParticipants(state)
	};
};

const mapDispatchToProps = {
  enhancerGetParticipantsStream: ParticipantsEnhancerActions.enhancerGetParticipantsStream,
  enhancerGetSelectedParticipantId: ParticipantsEnhancerActions.enhancerGetSelectedParticipantId,
  enhancerSetSelectParticipant: ParticipantsEnhancerActions.enhancerSetSelectParticipant,
  toggleGridLayout: UIStateActions.toggleGridLayout
};

@connect(mapStateToProps, mapDispatchToProps)
export default
class ParticipantsContainer extends React.Component {
  static propTypes = {
    enhancerGetParticipantsStream: PropTypes.func,
    enhancerGetSelectedParticipantId: PropTypes.func,
    enhancerSetSelectParticipant: PropTypes.func,
    toggleGridLayout: PropTypes.func,
    isShowGridParticipants: PropTypes.bool,
  }

  static defaultProps = {
    enhancerGetParticipantsStream: () => [],
    enhancerGetSelectedParticipantId: () => null,
    enhancerSetSelectParticipant: () => null,
    toggleGridLayout: () => null,
    isShowGridParticipants: false
  }

  constructor(props) {
    super(props);
  }

  get getAllStreams() {
    return this.props.enhancerGetParticipantsStream();
  }

  get selectedParticipantId() {
    return this.props.enhancerGetSelectedParticipantId();
  }

  toggleGridLayout = () => {
    this.props.toggleGridLayout(!this.props.isShowGridParticipants);
  }

  setSelectParticipant = (participantId) => {
    this.props.enhancerSetSelectParticipant(participantId);
  }

  render() {
    return (
      <ParticipantsComponent
        isShowGridParticipants={this.props.isShowGridParticipants}
        toggleGridLayout={this.toggleGridLayout}
        allStreams={this.getAllStreams}
        selectedParticipantId={this.selectedParticipantId}
        setSelectParticipant={this.setSelectParticipant}
      />
    );
  }
}
