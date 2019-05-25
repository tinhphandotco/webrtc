import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { ParticipantsActions, UIStateActions } from 'actions';
import {
  listParticipantSetting,
  getParticipantsStream,
  getLocalParticipantId,
  getSelectedParticipant,
} from 'reducers/participants/select';
import { isShowGridParticipants } from 'reducers/uiState/select';
import { getSinkId } from 'reducers/devices/select';

import ParticipantsComponent from './ParticipantsComponent';

const mapStateToProps = (state) => {
	return {
    allStreams: getParticipantsStream(state),
    localParticipantId: getLocalParticipantId(state),
    isShowGridParticipants: isShowGridParticipants(state),
    sinkId: getSinkId(state),
    listParticipantSetting: listParticipantSetting(state),
    selectedParticipant: getSelectedParticipant(state),
	};
};

const mapDispatchToProps = {
  setSelectParticipant: ParticipantsActions.setSelectParticipant,
  toggleGridLayout: UIStateActions.toggleGridLayout
};

@connect(mapStateToProps, mapDispatchToProps)
export default
class ParticipantsContainer extends React.Component {
  static propTypes = {
    toggleGridLayout: PropTypes.func,
    isShowGridParticipants: PropTypes.bool.isRequired,
    sinkId: PropTypes.string,
    listParticipantSetting: PropTypes.object.isRequired,
    allStreams: PropTypes.array.isRequired,
    localParticipantId: PropTypes.string.isRequired,
    selectedParticipant: PropTypes.object.isRequired,
    setSelectParticipant: PropTypes.func,
  }

  static defaultProps = {
    setSelectParticipant: () => null,
    toggleGridLayout: () => null,
    sinkId: '',
  }

  constructor(props) {
    super(props);
  }

  toggleGridLayout = () => {
    this.props.toggleGridLayout(!this.props.isShowGridParticipants);
  }

  setSelectParticipant = (participantId) => {
    this.props.setSelectParticipant(participantId);
  }

  render() {
    return (
      <ParticipantsComponent
        localParticipantId={this.props.localParticipantId}
        isShowGridParticipants={this.props.isShowGridParticipants}
        toggleGridLayout={this.toggleGridLayout}
        allStreams={this.props.allStreams}
        selectedParticipantId={this.props.selectedParticipant.id}
        setSelectParticipant={this.setSelectParticipant}
        sinkId={this.props.sinkId}
        listParticipantSetting={this.props.listParticipantSetting}
      />
    );
  }
}
