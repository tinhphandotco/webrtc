import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import Caret from 'elements/Caret';
import { Participant } from './atomics';
import { StyledParticipants } from './styled';

export default class ParticipantsComponent extends React.Component {
  static propTypes = {
    allStreams: PropTypes.array,
    toggleGridLayout: PropTypes.func,
    isShowGridParticipants: PropTypes.bool,
  }

  static defaultProps = {
    allStreams: [],
    toggleGridLayout: () => null,
    isShowGridParticipants: false
  }

  constructor(props) {
    super(props);

    this.state = {
      isShowListParticipants: true
    };
  }

  get streams() {
    return this.props.allStreams;
  }

  get isHideListParticipants() {
    return (!this.props.isShowGridParticipants && !this.state.isShowListParticipants) ? 1 : 0;
  }

  toggleListParticipants = () => {
    this.setState((prevState) => ({
      isShowListParticipants: !prevState.isShowListParticipants
    }));
  }

  render() {
    return (
      <StyledParticipants gridLayout={this.props.isShowGridParticipants} totalParticipants={this.streams.length}>
        <StyledParticipants.Header>
          <StyledParticipants.ChangeView onClick={this.props.toggleGridLayout}>
            <Icon type="appstore" />
            <span className="u-mgl-5">Change View</span>
          </StyledParticipants.ChangeView>
          <StyledParticipants.Toggler onClick={this.toggleListParticipants}>
            <Caret direction={this.state.isShowListParticipants ? 'right' : 'left'} />
          </StyledParticipants.Toggler>
        </StyledParticipants.Header>

        <StyledParticipants.ListScrollbar autoHide hiding={this.isHideListParticipants}>
          <StyledParticipants.List>
            {this.streams.map(item => (
              <StyledParticipants.Participant key={item.id}>
                <Participant stream={item.stream} />
              </StyledParticipants.Participant>
            ))}
          </StyledParticipants.List>
        </StyledParticipants.ListScrollbar>
      </StyledParticipants>
    );
  }
}
