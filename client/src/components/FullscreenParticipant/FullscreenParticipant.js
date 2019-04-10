import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { ParticipantsEnhancerActions } from 'actions';
import { getSelectedParticipant } from 'reducers/participants/select';

import StyledFullscreenParticipant from './styled';

const mapStateToProps = (state) => {
	return {
    selectedParticipant: getSelectedParticipant(state),
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
  }

  static defaultProps = {
    selectedParticipant: {},
    enhancerGetSelectedParticipant: () => null
  }

  get selectedParticipant() {
    return this.props.enhancerGetSelectedParticipant();
  }

  render() {
    return (
      <StyledFullscreenParticipant>
        <StyledFullscreenParticipant.Video srcObject={this.selectedParticipant.stream} playsInline autoPlay muted />
      </StyledFullscreenParticipant>
    );
  }
}