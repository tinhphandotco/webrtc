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
  toggleGridLayout: UIStateActions.toggleGridLayout
};

@connect(mapStateToProps, mapDispatchToProps)
export default
class ParticipantsContainer extends React.Component {
  static propTypes = {
    enhancerGetParticipantsStream: PropTypes.func,
    toggleGridLayout: PropTypes.func,
    isShowGridParticipants: PropTypes.bool,
  }

  static defaultProps = {
    enhancerGetParticipantsStream: () => [],
    toggleGridLayout: () => null,
    isShowGridParticipants: false
  }

  constructor(props) {
    super(props);
  }

  get getAllStreams() {
    return this.props.enhancerGetParticipantsStream() || [];
  }

  toggleGridLayout = () => {
    this.props.toggleGridLayout(!this.props.isShowGridParticipants);
  }

  render() {
    console.log('ParticipantsContainer: ', this.getAllStreams);
    return (
      <ParticipantsComponent
        isShowGridParticipants={this.props.isShowGridParticipants}
        toggleGridLayout={this.toggleGridLayout}
        allStreams={this.getAllStreams}
      />
    );
  }
}
