import React from 'react';
import PropTypes from 'prop-types';

import { copyToClipboard } from 'utils/common';

import { Input, Button, Icon, message } from 'antd';

import StyledInfor from './styled';

export default
class Infor extends React.Component {
  static propTypes = {
    updatePassword: PropTypes.func.isRequired,
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);

    this.state = {
      isEditPassword: false,
      password: props.password
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.password !== prevProps.password) {
      this.setState({
        password: this.props.password,
      });
    }
  }

  handleEditPassword = () => {
    this.setState({
      isEditPassword: !this.state.isEditPassword,
      password: this.props.password
    });
  }

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  cancelEditPassword = () => {
    this.setState({
      isEditPassword: false,
      password: this.props.password
    });
  }

  copyLink = () => {
    copyToClipboard(window.location.href);
    message.info('Copy successfull!');
  }

  updatePassword = () => {
    this.props.updatePassword(this.state.password);
    this.setState({
      isEditPassword: false,
    });
  }

  render() {
    return (
      <StyledInfor>
        <StyledInfor.Row>
          <StyledInfor.Label>Link: </StyledInfor.Label>
          <StyledInfor.Content>{window.location.href}</StyledInfor.Content>
        </StyledInfor.Row>

        <StyledInfor.Row>
          <StyledInfor.Label>Password: </StyledInfor.Label>
          <Choose>
            <When condition={this.state.isEditPassword}>
              <StyledInfor.InputGroup>
                <StyledInfor.InputWrapper>
                  <Input value={this.state.password} onChange={this.onChangePassword} />
                </StyledInfor.InputWrapper>
                <StyledInfor.InputActions>
                  <Button type="primary" size="small" style={{ marginRight: '5px' }} onClick={this.updatePassword}>
                    <Icon type="check" />
                  </Button>
                  <Button type="danger" size="small" onClick={this.cancelEditPassword}>
                    <Icon type="close" />
                  </Button>
                </StyledInfor.InputActions>
              </StyledInfor.InputGroup>
            </When>
            <When condition={!this.state.isEditPassword}>
              <StyledInfor.Content>{this.props.password || 'None'}</StyledInfor.Content>
            </When>
          </Choose>
        </StyledInfor.Row>

        <StyledInfor.Actions>
          <StyledInfor.ActionItem onClick={this.copyLink}>Copy</StyledInfor.ActionItem>
          <StyledInfor.ActionItem onClick={this.handleEditPassword}>
            {this.state.isEditPassword ? 'Cancel Password' : 'Add Password'}
          </StyledInfor.ActionItem>
        </StyledInfor.Actions>
      </StyledInfor>
    );
  }
}
