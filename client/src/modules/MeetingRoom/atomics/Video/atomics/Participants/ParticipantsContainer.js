import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { getLocalUserInfo } from 'reducers/participants/select';

import { StyledParticipants } from './styled';

const mapStateToProps = (state) => {
	return {
    localUserInfo: getLocalUserInfo(state),
	};
};

const mapDispatchToProps = {
};

@connect(mapStateToProps, mapDispatchToProps)
class ParticipantsContainer extends React.Component {
  static propTypes = {
    enhancerGetParticipantsStream: PropTypes.func,
  }

  static defaultProps = {
    enhancerGetParticipantsStream: () => null,
  }

  constructor(props) {
    super(props);
  }

  get getAllStreams() {
    return this.props.enhancerGetParticipantsStream();
  }

  render() {
    return (
      <StyledParticipants>
        {this.getAllStreams.map(item => (
          <StyledParticipants.Video srcObject={item.stream} key={item.id} id={item.id} playsInline autoPlay muted />
        ))}
      </StyledParticipants>
    );
  }
}

export default ParticipantsContainer;