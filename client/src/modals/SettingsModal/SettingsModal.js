import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { path, equals } from 'ramda';
import { staticUrl } from 'utils/common';

import { DevicesActions, ParticipantsEnhancerActions } from 'actions';
import { getDevices } from 'reducers/devices/select';


import { message, Select, Button } from 'antd';
import CheckMic from 'components/CheckMic';

import StyledSettingsModal from './styled';

const mapStateToProps = (state) => {
	return {
    devices: getDevices(state),
	};
};

const mapDispatchToProps = {
  setDevices: DevicesActions.setDevices,
  setStream: ParticipantsEnhancerActions.enhancerSetStream
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

  testSound = () => {
    this.audio.play();
  }

  handleSelectChange = (type) => (value) => {
    this.setState({
      [type]: value
    });

    this.didChangeDevices = true;

    if (type === 'selectedVideoInput' || type === 'selectedAudioInput') {
      this.getUserMedia({
        videoinput: type === 'selectedVideoInput' ? value : this.state.selectedVideoInput,
        audioinput: type === 'selectedAudioInput' ? value : this.state.selectedAudioInput
      });
    }
  }

  onOk = () => {
    this.props.onCancel();
    if (this.didChangeDevices) {
      this.props.setDevices({
        videoinput: this.state.selectedVideoInput,
        audioinput: this.state.selectedAudioInput,
        audiooutput: this.state.selectedAudioOutput,
      });
      this.props.setStream(this.state.stream);
    }
  }

  render() {
    return (
      <StyledSettingsModal>
        <StyledSettingsModal.Devices>
          <StyledSettingsModal.Preview>
            <StyledSettingsModal.Video srcObject={this.state.stream} playsInline autoPlay muted sinkId={this.state.selectedAudioOutput} />
            <StyledSettingsModal.CheckMic>
              <CheckMic progress={30} />
            </StyledSettingsModal.CheckMic>
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

            <StyledSettingsModal.SelectRow audiooutput>
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