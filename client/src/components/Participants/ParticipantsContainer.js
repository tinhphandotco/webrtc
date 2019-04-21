import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { ParticipantsEnhancerActions, UIStateActions } from 'actions';
import { getAllStreams, listParticipantSetting } from 'reducers/participants/select';
import { isShowGridParticipants } from 'reducers/uiState/select';
import { getSinkId } from 'reducers/devices/select';

import ParticipantsComponent from './ParticipantsComponent';

const mapStateToProps = (state) => {
	return {
    allStreams: getAllStreams(state),
    isShowGridParticipants: isShowGridParticipants(state),
    sinkId: getSinkId(state),
    listParticipantSetting: listParticipantSetting(state)
	};
};

const mapDispatchToProps = {
  enhancerGetLocalParticipantId: ParticipantsEnhancerActions.enhancerGetLocalParticipantId,
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
    enhancerGetLocalParticipantId: PropTypes.func,
    enhancerGetSelectedParticipantId: PropTypes.func,
    enhancerSetSelectParticipant: PropTypes.func,
    toggleGridLayout: PropTypes.func,
    isShowGridParticipants: PropTypes.bool,
    sinkId: PropTypes.string,
    listParticipantSetting: PropTypes.object.isRequired,
  }

  static defaultProps = {
    enhancerGetParticipantsStream: () => [],
    enhancerGetSelectedParticipantId: () => null,
    enhancerGetLocalParticipantId: () => null,
    enhancerSetSelectParticipant: () => null,
    toggleGridLayout: () => null,
    isShowGridParticipants: false,
    sinkId: '',
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

  get localParticipantId() {
    return this.props.enhancerGetLocalParticipantId();
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
        localParticipantId={this.localParticipantId}
        isShowGridParticipants={this.props.isShowGridParticipants}
        toggleGridLayout={this.toggleGridLayout}
        allStreams={this.getAllStreams}
        selectedParticipantId={this.selectedParticipantId}
        setSelectParticipant={this.setSelectParticipant}
        sinkId={this.props.sinkId}
        listParticipantSetting={this.props.listParticipantSetting}
      />
    );
  }
}
