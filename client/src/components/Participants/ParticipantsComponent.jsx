import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import Caret from 'elements/Caret';
import { Participant } from './atomics';
import { StyledParticipants } from './styled';

export default class ParticipantsComponent extends React.Component {
  static propTypes = {
    allStreams: PropTypes.array,
  }

  static defaultProps = {
    allStreams: [],
  }

  constructor(props) {
    super(props);

    this.state = {
      isShowListParticipants: true
    };

    this.data = Array(10).fill();
  }

  toggleListParticipants = () => {
    this.setState((prevState) => ({
      isShowListParticipants: !prevState.isShowListParticipants
    }));
  }

  render() {
    console.log(this.props);
    return (
      <StyledParticipants>
        <StyledParticipants.Header>
          <StyledParticipants.ChangeView>
            <Icon type="appstore" />
            <span className="u-mgl-5">Change View</span>
          </StyledParticipants.ChangeView>
          <StyledParticipants.Toggler onClick={this.toggleListParticipants}>
            <Caret direction={this.state.isShowListParticipants ? 'right' : 'left'} />
          </StyledParticipants.Toggler>
        </StyledParticipants.Header>

        <StyledParticipants.List autoHide hiding={this.state.isShowListParticipants ? 0 : 1}>
          {this.props.allStreams.map(item => (
            <Participant key={item.id} stream={item.stream} />
          ))}
        </StyledParticipants.List>
      </StyledParticipants>
    );
  }
}
