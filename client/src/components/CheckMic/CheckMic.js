import React from 'react';
import PropTypes from 'prop-types';
import { path } from 'ramda';
import { message } from 'antd';
import StyledCheckMic from './styled';

export default class CheckMic extends React.Component {
  static propTypes = {
    progress: PropTypes.number,
    audioinput: PropTypes.string,
  };

  static defaultProps = {
    progress: 0,
    audioinput: '',
  };

  constructor(props) {
    super(props);

    this.audioStream = null;
    this.context = null;
    this.script = null;
    this.mic = null;
    this.visualizeTimer = null;

    this.state = {
      progress: props.progress,
    };

    this.$ref = {
      progress: React.createRef(),
    };
  }

  componentDidMount() {
    this.createContext();
    this.getMicrophoneInput();
    this.setProgress(this.state.progress);
  }

  componentWillUnmount() {
    try {
      this.script.disconnect(this.context.destination);
    } catch(e) {
      console.error(e);
    }
  }

  setProgress = (progress) => {
    const $progress = path(['progress', 'current'], this.$ref);
    if ($progress) {
      $progress.style.width = `${100 - progress}%`;
    }
  }

  createContext = () => {
    this.context = new AudioContext();
    this.script = this.context.createScriptProcessor(2048, 1, 1);
    this.script.onaudioprocess = (event) => {
      const input = event.inputBuffer.getChannelData(0);
      let i;
      let sum = 0.0;
      // eslint-disable-next-line no-unused-vars
      let clipcount = 0;
      for (i = 0; i < input.length; ++i) {
        sum += input[i] * input[i];
        if (Math.abs(input[i]) > 0.99) {
          clipcount += 1;
        }
      }
      const volume = Math.sqrt(sum / input.length);
      this.setProgress(volume * 100);
    };
  }

  getMicrophoneInput = () => {
    navigator.mediaDevices.getUserMedia({ audio: { deviceId: this.props.audioinput || null } })
      .then((stream) => this.onStream(stream))
      .catch((error) => {
        message.error(error.name);
      });
  }

  onStream = (stream) => {
    try {
      this.mic = this.context.createMediaStreamSource(stream);
      this.mic.connect(this.script);
      this.script.connect(this.context.destination);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <StyledCheckMic>
        <StyledCheckMic.Progress ref={this.$ref.progress} />
      </StyledCheckMic>
    );
  }
}