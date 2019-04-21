import React from 'react';
import PropTypes from 'prop-types';
import { path } from 'ramda';
import { Icon } from 'antd';
import Caret from 'elements/Caret';
import { Participant } from './atomics';
import { StyledParticipants } from './styled';

export default class ParticipantsComponent extends React.Component {
  static propTypes = {
    allStreams: PropTypes.array,
    toggleGridLayout: PropTypes.func,
    setSelectParticipant: PropTypes.func,
    isShowGridParticipants: PropTypes.bool,
    selectedParticipantId: PropTypes.string,
    localParticipantId: PropTypes.string,
    sinkId: PropTypes.string,
    listParticipantSetting: PropTypes.object.isRequired,
  }

  static defaultProps = {
    allStreams: [],
    toggleGridLayout: () => null,
    setSelectParticipant: () => null,
    isShowGridParticipants: false,
    selectedParticipantId: '',
    localParticipantId: null,
    sinkId: '',
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

  // NOTE: Because we store participant in enhancer so when other connected --> store reducer hasnt updated yet
  getParticipantSettingById = (participantId) => {
    return path([participantId, 'settings'], this.props.listParticipantSetting) || {
      video: {
        active: false,
        enable: false,
      },
      audio: {
        active: false,
        enable: false,
      }
    };
  }

  getSinkIdNotForLocal(participantId) {
    return this.isLocalParticipant(participantId) ? null : this.props.sinkId;
  }

  isLocalParticipant(participantId) {
    return this.props.localParticipantId === participantId;
  }

  isSelectedParticipant = (participantId) => {
    return !this.props.isShowGridParticipants && this.props.selectedParticipantId === participantId;
  }

  toggleListParticipants = () => {
    this.setState((prevState) => ({
      isShowListParticipants: !prevState.isShowListParticipants
    }));
  }

  handleSelectParticipant = (participantId) => {
    if (!this.props.isShowGridParticipants) {
      this.props.setSelectParticipant(participantId);
    }
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
          {this.streams.map(item => (
            <StyledParticipants.Participant key={item.id} >
              <Participant
                settingDevices={this.getParticipantSettingById(item.id)}
                isLocalParticipant={this.isLocalParticipant(item.id)}
                sinkId={this.getSinkIdNotForLocal(item.id)}
                participant={item}
                selected={this.isSelectedParticipant(item.id)}
                handleSelectParticipant={this.handleSelectParticipant}
              />
            </StyledParticipants.Participant>
          ))}
        </StyledParticipants.ListScrollbar>
      </StyledParticipants>
    );
  }
}
