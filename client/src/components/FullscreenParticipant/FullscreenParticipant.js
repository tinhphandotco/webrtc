import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { ParticipantsEnhancerActions } from 'actions';

import StyledFullscreenParticipant from './styled';


const mapStateToProps = () => {
	return {
	};
};

const { enhancerGetSelectedParticipant } = ParticipantsEnhancerActions;
const mapDispatchToProps = {
  enhancerGetSelectedParticipant: enhancerGetSelectedParticipant
};

@connect(mapStateToProps, mapDispatchToProps)

export default class FullscreenParticipant extends React.Component {
  static propTypes = {
    enhancerGetSelectedParticipant: PropTypes.func,
  }

  static defaultProps = {
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