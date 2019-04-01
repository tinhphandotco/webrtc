import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { RoomActions } from 'actions';

import {
  Input,
} from 'antd';
import { Button } from 'components';

import { ConnectRoom as StyledConnectRoom } from './styled';

import * as serviceWebRTC from 'services/WebRTC';

const mapStateToProps = () => {
	return {
	};
};

const { joinRoom } = RoomActions;
const mapDispatchToProps = {
  joinRoom
};

@connect(mapStateToProps, mapDispatchToProps)
class ConnectRoomContainer extends React.Component {
  static propTypes = {
    joinRoom: PropTypes.func,
    history: PropTypes.object.isRequired,
  }

  static defaultProps = {
    joinRoom: () => null,
  }

  constructor(props) {
    super(props);

    this.state = {
      roomName: ''
    };
  }

  handleChangeRoomName = (e) => {
    this.setState({
      roomName: e.target.value
    });
  }

  handleCreateOrJoinRoom = (e) => {
    e.preventDefault();

    if (this.state.roomName) {
      serviceWebRTC.joinRoom(this.state.roomName)
        .then(roomName => {
          this.props.joinRoom(roomName);
          this.props.history.push('/meeting/' + roomName);
        });
    }
  }

  render() {
    return (
      <StyledConnectRoom.Wrapper>
        <StyledConnectRoom.EnterRoom>
          <h3>Start a new meeting</h3>
          <StyledConnectRoom.Form onSubmit={this.handleCreateOrJoinRoom}>
            <Input placeholder="Enter room name" value={this.state.roomName} onChange={this.handleChangeRoomName} />
            <Button htmlType="submit" type="primary" mgx={2}>OK</Button>
          </StyledConnectRoom.Form>
        </StyledConnectRoom.EnterRoom>
      </StyledConnectRoom.Wrapper>
    );
  }
}

export default ConnectRoomContainer;