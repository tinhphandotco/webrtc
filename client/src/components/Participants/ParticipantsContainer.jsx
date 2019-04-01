import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { ParticipantsEnhancerActions } from 'actions';
import { getLocalUserInfo } from 'reducers/participants/select';

import ParticipantsComponent from './ParticipantsComponent';

const mapStateToProps = (state) => {
	return {
    localUserInfo: getLocalUserInfo(state),
	};
};

const mapDispatchToProps = {
  enhancerGetParticipantsStream: ParticipantsEnhancerActions.enhancerGetParticipantsStream,
};

@connect(mapStateToProps, mapDispatchToProps)
export default
class ParticipantsContainer extends React.Component {
  static propTypes = {
    enhancerGetParticipantsStream: PropTypes.func,
  }

  static defaultProps = {
    enhancerGetParticipantsStream: () => [],
  }

  constructor(props) {
    super(props);
  }

  get getAllStreams() {
    return this.props.enhancerGetParticipantsStream() || [];
  }

  render() {
    return (
      <ParticipantsComponent allStreams={this.getAllStreams} />
    );
  }
}
