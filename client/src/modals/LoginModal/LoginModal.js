import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import { RoomActions } from 'actions';
import { loginMessageError } from 'reducers/room/select';

import { message, Button, Input } from 'antd';

import StyledLoginModal from './styled';

const mapStateToProps = (state) => {
	return {
    loginMessageError: loginMessageError(state),
	};
};

const mapDispatchToProps = {
  loginRoom: RoomActions.loginRoom,
  resetLoginMessageError: RoomActions.resetLoginMessageError,
};

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class LoginModal extends React.Component {
  static propTypes = {
    loginRoom: PropTypes.func,
    resetLoginMessageError: PropTypes.func,
    loginMessageError: PropTypes.string,
    match: PropTypes.object.isRequired,
  }

  static defaultProps = {
    loginMessageError: '',
    loginRoom: () => null,
    resetLoginMessageError: () => null,
  }

  constructor(props) {
    super(props);

    this.state = {
      password: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.loginMessageError !== prevProps.loginMessageError && this.props.loginMessageError) {
      message.error(this.props.loginMessageError);
      this.props.resetLoginMessageError();
    }
  }

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  }

  handleLogin = () => {
    this.props.loginRoom(this.props.match.params.roomName, this.state.password);
  }

  render() {
    return (
      <StyledLoginModal>
        <StyledLoginModal.Title>Password required!</StyledLoginModal.Title>
        <StyledLoginModal.Form>
          <StyledLoginModal.Label>Password</StyledLoginModal.Label>
          <StyledLoginModal.InputWrapper>
            <Input value={this.state.password} onChange={this.onChangePassword} onPressEnter={this.handleLogin} />
          </StyledLoginModal.InputWrapper>
          <StyledLoginModal.Actions>
            <Button type="primary" onClick={this.handleLogin}>OK</Button>
          </StyledLoginModal.Actions>
        </StyledLoginModal.Form>
      </StyledLoginModal>
    );
  }
}