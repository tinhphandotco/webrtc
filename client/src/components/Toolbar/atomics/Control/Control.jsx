import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Tooltip, Popconfirm } from 'antd';
import MyIcon from 'elements/MyIcon';
import StyledControl from './styled';

export default
class Toolbar extends React.Component {
  static propTypes = {
    settingDevices: PropTypes.object.isRequired,
    toggleAudioDevice: PropTypes.func.isRequired,
    toggleVideoDevice: PropTypes.func.isRequired,
    leaveRoom: PropTypes.func.isRequired,
    isSharingScreen: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      isShowTooltip: false,
      isShowPopconfirm: false,
    };
  }

  get isVideoEnable() {
    const { settingDevices } = this.props;
    return settingDevices.video.isSharingScreen || settingDevices.video.enable;
  }

  shouldComponentUpdate(nextProps, nextState) {
    const diffSettingDevices = this.props.settingDevices !== nextProps.settingDevices;
    const diffIsSharingScreen = this.props.isSharingScreen !== nextProps.isSharingScreen;
    const diffIsShowTooltip = this.state.isShowTooltip !== nextState.isShowTooltip;
    const diffIsShowPopconfirm = this.state.isShowPopconfirm !== nextState.isShowPopconfirm;

    return diffSettingDevices || diffIsSharingScreen || diffIsShowTooltip || diffIsShowPopconfirm;
  }

  handleMouseEnterTooltip = () => {
    this.setState({
      isShowTooltip: !this.state.isShowPopconfirm,
    });
  }

  handleMouseLeaveTooltip = () => {
    this.setState({
      isShowTooltip: false,
    });
  }

  handleVisibleChangePopconfirm = (visible) => {
    this.setState({
      isShowTooltip: false,
      isShowPopconfirm: visible,
    });
  }

  render() {
    const { settingDevices, isSharingScreen, toggleAudioDevice, toggleVideoDevice, leaveRoom } = this.props;

    return (
      <StyledControl>
        <StyledControl.DeviceControl disabled={!settingDevices.audio.active} onClick={toggleAudioDevice}>
          <MyIcon type={settingDevices.audio.enable ? 'iconmic' : 'iconmic_off'} />
        </StyledControl.DeviceControl>

        <Popconfirm
          title="Are you sure delete this task?"
          onConfirm={leaveRoom}
          okText="Yes"
          cancelText="No"
          onVisibleChange={this.handleVisibleChangePopconfirm}
          visible={this.state.isShowPopconfirm}
          overlayClassName="pop-confirm pop-confirm--white"
        >
          <Tooltip
            placement="top"
            title="Exit from room"
            mouseLeaveDelay={0}
            visible={this.state.isShowTooltip}
          >
            <StyledControl.LeaveControl
              onMouseEnter={this.handleMouseEnterTooltip}
              onMouseLeave={this.handleMouseLeaveTooltip}
            >
              <Icon type="close" />
            </StyledControl.LeaveControl>
          </Tooltip>
        </Popconfirm>

        <StyledControl.DeviceControl disabled={!settingDevices.video.active || isSharingScreen} onClick={toggleVideoDevice}>
          <MyIcon type={this.isVideoEnable ? 'iconcamera' : 'iconcamera-off'} />
        </StyledControl.DeviceControl>
      </StyledControl>
    );
  }
}
