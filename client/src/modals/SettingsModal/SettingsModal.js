import React from 'react';
import PropTypes from 'prop-types';
import { path } from 'ramda';
import { message, Select, Button } from 'antd';
import StyledSettingsModal from './styled';

export default class SettingsModal extends React.Component {
  static propTypes = {
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    onOk: () => {},
    onCancel: () => {},
  }

  constructor(props) {
    super(props);

    this.state = {
      videoinput: [],
      audioinput: [],
      audiooutput: [],
      selectedVideoInput: null,
      selectedAudioInput: null,
      selectedAudioOutput: null,
      stream: null,
    };
  }

  componentDidMount() {
    this.getUserMedia({
      videoinput: this.state.selectedVideoInput,
      audioinput: this.state.selectedAudioInput
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

        const selectedVideoInput = path(['id'], retvl.videoinput[0]) || null;
        const selectedAudioInput = path(['id'], retvl.audioinput[0]) || null;
        const selectedAudioOutput = path(['id'], retvl.audiooutput[0]) || null;

        this.setState({
          ...retvl,
          selectedVideoInput,
          selectedAudioInput,
          selectedAudioOutput
        });
      })
      .catch((error) => {
        message.error(error.name);
      });
  }

  getUserMedia = (settings) => {
    const constraints = {
      audio: { deviceId: settings.audioinput ? { exact: settings.audioinput } : undefined },
      video: { deviceId: settings.videoinput ? { exact: settings.videoinput } : undefined }
    };

    return navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        this.setState({ stream });
        return Promise.resolve();
      })
      .catch((error) => {
        message.error(error.name);
        return Promise.reject();
      });
  }

  handleSelectChange = (type) => (value) => {
    this.setState({
      [type]: value
    });

    if (type === 'selectedVideoInput' || type === 'selectedAudioInput') {
      this.getUserMedia({
        videoinput: type === 'selectedVideoInput' ? value : this.state.selectedVideoInput,
        audioinput: type === 'selectedAudioInput' ? value : this.state.selectedAudioInput
      });
    }
  }

  onOk = () => {
    this.props.onOk(this.state.stream);
    this.props.onCancel();
  }

  render() {
    return (
      <StyledSettingsModal>
        <StyledSettingsModal.Devices>
          <StyledSettingsModal.Preview>
            <StyledSettingsModal.Video srcObject={this.state.stream} playsInline autoPlay muted />
          </StyledSettingsModal.Preview>

          <StyledSettingsModal.Selection>
            <StyledSettingsModal.SelectRow>
              <StyledSettingsModal.SelectLabel>Camera</StyledSettingsModal.SelectLabel>
              <StyledSettingsModal.Selector
                value={this.state.selectedVideoInput}
                onChange={this.handleSelectChange('selectedVideoInput')}
              >
                {this.state.videoinput.map((video, idx) => (
                  <Select.Option key={idx} value={video.id}>{video.label}</Select.Option>
                ))}
              </StyledSettingsModal.Selector>
            </StyledSettingsModal.SelectRow>

            <StyledSettingsModal.SelectRow>
              <StyledSettingsModal.SelectLabel>Microphone</StyledSettingsModal.SelectLabel>
              <StyledSettingsModal.Selector
                value={this.state.selectedAudioInput}
                onChange={this.handleSelectChange('selectedAudioInput')}
              >
                {this.state.audioinput.map((audio, idx) => (
                  <Select.Option key={idx} value={audio.id}>{audio.label}</Select.Option>
                ))}
              </StyledSettingsModal.Selector>
            </StyledSettingsModal.SelectRow>

            <StyledSettingsModal.SelectRow>
              <StyledSettingsModal.SelectLabel>Audio output</StyledSettingsModal.SelectLabel>
              <StyledSettingsModal.Selector
                value={this.state.selectedAudioOutput}
                onChange={this.handleSelectChange('selectedAudioOutput')}
              >
                {this.state.audiooutput.map((audio, idx) => (
                  <Select.Option key={idx} value={audio.id}>{audio.label}</Select.Option>
                ))}
              </StyledSettingsModal.Selector>
            </StyledSettingsModal.SelectRow>
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