import React from 'react';
import PropTypes from 'prop-types';
import { path } from 'ramda';

export default class Video extends React.Component {
  static propTypes = {
    srcObject: PropTypes.any,
    playsInline: PropTypes.bool,
    autoPlay: PropTypes.bool,
    muted: PropTypes.bool,
    className: PropTypes.string,
  }

  static defaultProps = {
    srcObject: null,
    playsInline: false,
    autoPlay: false,
    muted: false,
    className: ''
  }

  constructor(props) {
    super(props);

    this.$ref = {
      video: React.createRef()
    };
  }

  injectSrcObject = () => {
    const $video = path(['video', 'current'], this.$ref);
    if ($video) {
      $video.srcObject = this.props.srcObject;
    }
  }

  componentDidMount() {
    this.injectSrcObject();
  }

  componentDidUpdate(prevProps) {
    if (this.props.srcObject !== prevProps.srcObject) {
      this.injectSrcObject();
    }
  }

  render() {
    const { className, playsInline, autoPlay, muted } = this.props;
    return (
      <video
        className={className}
        ref={this.$ref.video}
        playsInline={playsInline}
        autoPlay={autoPlay}
        muted={muted}
      />
    );
  }
}
