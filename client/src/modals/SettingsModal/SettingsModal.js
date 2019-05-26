import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { path } from 'ramda';
import { staticUrl } from 'utils/common';

import { DevicesActions, ParticipantsActions } from 'actions';
import { localParticipantSettings } from 'reducers/participants/select';
import { getDevices } from 'reducers/devices/select';


import { message, Select, Button } from 'antd';
import CheckMic from 'components/CheckMic';

import StyledSettingsModal from './styled';

const mapStateToProps = (state) => {
	return {
    devices: getDevices(state),
    settingDevices: localParticipantSettings(state)
	};
};

const mapDispatchToProps = {
  setDevices: DevicesActions.setDevices,
  setStream: ParticipantsActions.setStream
};

@connect(mapStateToProps, mapDispatchToProps)
export default class SettingsModal extends React.Component {
  static propTypes = {
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    devices: PropTypes.shape({
      audioinput: PropTypes.string,
      audiooutput: PropTypes.string,
      videoinput: PropTypes.string,
    }),
    setDevices: PropTypes.func,
    setStream: PropTypes.func,
    settingDevices: PropTypes.shape({
      video: PropTypes.shape({
        active: PropTypes.bool,
        enable: PropTypes.bool
      }),
      audio: PropTypes.shape({
        active: PropTypes.bool,
        enable: PropTypes.bool
      })
    }).isRequired
  }

  static defaultProps = {
    onOk: () => {},
    onCancel: () => {},
    setDevices: () => {},
    setStream: () => {},
    devices: {
      audioinput: '',
      audiooutput: '',
      videoinput: '',
    }
  }

  constructor(props) {
    super(props);

    this.didChangeDevices = false;
    this.audio = new Audio(staticUrl('assets/audio/ring.wav'));

    this.state = {
      videoinput: [],
      audioinput: [],
      audiooutput: [],
      selectedVideoInput: path(['devices', 'videoinput'], this.props),
      selectedAudioInput: path(['devices', 'audioinput'], this.props),
      selectedAudioOutput: path(['devices', 'audiooutput'], this.props),
      stream: null,
    };
  }

  componentDidMount() {
    const { settingDevices } = this.props;

    this.getUserMedia({
      videoinput: this.state.selectedVideoInput,
      audioinput: this.state.selectedAudioInput
    }, {
      video: settingDevices.video.active,
      audio: settingDevices.audio.active
    })
      .then(() => {
        this.enumerateDevices();
      });
  }

  enumerateDevices = () => {
    navigator.mediaDevices.enumerateDevices()
      .then((deviceInfos) => {
        const retvl = deviceInfos.reduce((acc, deviceInfo) => ({
            ...acc,
            [deviceInfo.kind]: [
              ...(acc[deviceInfo.kind] || []),
              {
                id: deviceInfo.deviceId,
                label: deviceInfo.label || `${deviceInfo.kind} ${(acc[deviceInfo.kind] || []).length + 1}`
              }
            ]
        }), {});

        const selectedVideoInput = path(['devices', 'videoinput'], this.props) || path(['id'], retvl.videoinput[0]) || null;
        const selectedAudioInput = path(['devices', 'audioinput'], this.props) || path(['id'], retvl.audioinput[0]) || null;
        const selectedAudioOutput = path(['devices', 'audiooutput'], this.props) || path(['id'], retvl.audiooutput[0]) || null;

        this.setState({
          ...retvl,
          selectedVideoInput,
          selectedAudioInput,
          selectedAudioOutput
        });
      })
      .catch((error) => {
        console.log('enu: ', error);
        message.error(error.name);
      });
  }

  getUserMedia = (constraintSettings, settings) => {
    const constraints = {
      audio: settings.audio
        ? { deviceId: constraintSettings.audioinput ? { exact: constraintSettings.audioinput } : undefined }
        : false,
      video: settings.video
        ? { deviceId: constraintSettings.videoinput ? { exact: constraintSettings.videoinput } : undefined }
        : false
    };

    return navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        this.setState({ stream });
        return Promise.resolve();
      })
      .catch((error) => {
        console.log(error);
        // message.error(error.name);
        return Promise.reject();
      });
  }

  testSound = () => {
    this.audio.play();
  }

  handleSelectChange = (type) => (value) => {
    this.setState({
      [type]: value
    }, () => {
      if (type === 'selectedVideoInput' || type === 'selectedAudioInput') {
        this.getUserMedia({
          videoinput: type === 'selectedVideoInput' ? value : this.state.selectedVideoInput,
          audioinput: type === 'selectedAudioInput' ? value : this.state.selectedAudioInput
        }, {
          video: this.props.settingDevices.video.active,
          audio: this.props.settingDevices.audio.active
        });
      } else console.log(this.state.selectedAudioOutput);
    });

    this.didChangeDevices = true;
  }

  onOk = () => {
    if (this.didChangeDevices) {
      this.props.setDevices({
        videoinput: this.state.selectedVideoInput,
        audioinput: this.state.selectedAudioInput,
        audiooutput: this.state.selectedAudioOutput,
      });
      this.props.setStream(this.state.stream);
    }
    this.props.onCancel();
  }

  _renderPermissionDenide = (condition) => (
    <If condition={condition}>
      <StyledSettingsModal.Selector disabled defaultValue="">
        <Select.Option value="">Permission not granted</Select.Option>
      </StyledSettingsModal.Selector>
    </If>
  )

  render() {
    const { settingDevices } = this.props;

    return (
      <StyledSettingsModal>
        <StyledSettingsModal.Devices>
          <StyledSettingsModal.Preview>
            <StyledSettingsModal.Video srcObject={this.state.stream} playsInline autoPlay muted sinkId={this.state.selectedAudioOutput} />
            <StyledSettingsModal.CheckMic>
              <CheckMic progress={0} />
            </StyledSettingsModal.CheckMic>
          </StyledSettingsModal.Preview>

          <StyledSettingsModal.Selection>
            <StyledSettingsModal.SelectRow>
              <StyledSettingsModal.SelectLabel>Camera</StyledSettingsModal.SelectLabel>

              <If condition={settingDevices.video.active}>
                <StyledSettingsModal.Selector
                  value={this.state.selectedVideoInput}
                  onChange={this.handleSelectChange('selectedVideoInput')}
                >
                  {this.state.videoinput.map((video, idx) => (
                    <Select.Option key={idx} value={video.id}>{video.label}</Select.Option>
                  ))}
                </StyledSettingsModal.Selector>
              </If>

              {this._renderPermissionDenide(!settingDevices.video.active)}
            </StyledSettingsModal.SelectRow>

            <StyledSettingsModal.SelectRow>
              <StyledSettingsModal.SelectLabel>Microphone</StyledSettingsModal.SelectLabel>

              <If condition={settingDevices.audio.active}>
                <StyledSettingsModal.Selector
                  value={this.state.selectedAudioInput}
                  onChange={this.handleSelectChange('selectedAudioInput')}
                  disabled={!settingDevices.audio.active}
                >
                  {this.state.audioinput.map((audio, idx) => (
                    <Select.Option key={idx} value={audio.id}>{audio.label}</Select.Option>
                  ))}
                </StyledSettingsModal.Selector>
              </If>

              {this._renderPermissionDenide(!settingDevices.audio.active)}
            </StyledSettingsModal.SelectRow>

            <StyledSettingsModal.SelectRow audiooutput>
              <StyledSettingsModal.SelectLabel>Audio output</StyledSettingsModal.SelectLabel>

              <If condition={settingDevices.audio.active}>
                <StyledSettingsModal.Selector
                  value={this.state.selectedAudioOutput}
                  onChange={this.handleSelectChange('selectedAudioOutput')}
                >
                  {this.state.audiooutput.map((audio, idx) => (
                    <Select.Option key={idx} value={audio.id}>{audio.label}</Select.Option>
                  ))}
                </StyledSettingsModal.Selector>
              </If>

              {this._renderPermissionDenide(!settingDevices.audio.active)}
            </StyledSettingsModal.SelectRow>

            <StyledSettingsModal.TestSound onClick={this.testSound}>Play a test sound</StyledSettingsModal.TestSound>
          </StyledSettingsModal.Selection>
        </StyledSettingsModal.Devices>

        <StyledSettingsModal.Actions>
          <Button type="primary" onClick={this.onOk}>Ok</Button>
          <Button type="default" onClick={this.props.onCancel}>Cancel</Button>
        </StyledSettingsModal.Actions>
      </StyledSettingsModal>
    );
  }
}