import React from "react";
import { connect } from "react-redux";

import { getMyUserId } from 'reducers/room/select';
import { getUserSettingById } from 'reducers/users/select';

import {
  Input, 
} from 'antd';
import { Button } from 'components';

// import { ConnectRoom as StyledConnectRoom } from './styled';

import {
  joinRoom
} from 'services/WebRTC';

const mapStateToProps = (state, props) => {
  console.log('mapStateToProps: ', getMyUserId(state))
	return {
    mySettings: getUserSettingById(getMyUserId(state))(state)
	}
};

const mapDispatchToProps = {
};

@connect(mapStateToProps, mapDispatchToProps)
class MeetingRoomContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <h1>JASD</h1>
    )
  }
}

export default MeetingRoomContainer