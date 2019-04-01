
import React from "react";
import PropTypes from 'prop-types';

import { Spin, Icon } from 'antd';

class ImageLoader extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    fallback: PropTypes.string,
    src: PropTypes.string,
    hideLoading: PropTypes.bool,
    style: PropTypes.object
  };

  static defaultProps = {
    className: '',
    fallback: '',
    src: '',
    hideLoading: false,
    style: {}
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      hasError: false
    };
  }

  componentDidMount() {
    const img = new Image();
    img.src = this.props.src;
    img.onload = () => {
      this.setState({ isLoaded: true });
    };
    img.onerror = () => {
      this.setState({
        isLoaded: true,
        hasError: true
      });
    };
  }

  render() {
    if (!this.state.isLoaded && !this.props.hideLoading) {
      return (
        <div className="u-text-center" style={this.props.style}>
          <Spin indicator={<Icon type="loading" style={{ fontSize: 24, color: '#17e' }} spin />} />
        </div>
      );
    }

    if (this.state.hasError) {
      return (
        <React.Fragment>
          {this.props.fallback
          ? <img src={this.props.fallback} style={this.props.style} />
          : <span style={this.props.style}>Has error when load image...</span>
          }
        </React.Fragment>
      );
    }

    return (
      <img
        style={this.props.style}
        src={this.props.src}
        className={this.props.className}
      />
    );
  }
}

export default ImageLoader;