import React from 'react';
import { connect } from "react-redux";

import { ParticipantsEnhancerActions } from 'actions';
import { getLocalUserInfo } from 'reducers/participants/select';

import { StyledParticipants } from './styled';

const mapStateToProps = (state, props) => {
	return {
    localUserInfo: getLocalUserInfo(state),
	}
};

const mapDispatchToProps = {
  enhancerGetParticipantsStream: ParticipantsEnhancerActions.enhancerGetParticipantsStream,
}

@connect(mapStateToProps, mapDispatchToProps)
class ParticipantsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  get getAllStreams() {
    return this.props.enhancerGetParticipantsStream();
  }

  componentDidMount() {
    this.getAllStreams.forEach(item => {
      document.getElementById(item.id).srcObject = item.stream;
    })
  }

  render() {
    return (
      <StyledParticipants>
        {this.getAllStreams.map(item => (
          <StyledParticipants.Video key={item.id} id={item.id} playsInline autoPlay muted />
        ))}
      </StyledParticipants>
    );
  }
}

export default ParticipantsContainer;