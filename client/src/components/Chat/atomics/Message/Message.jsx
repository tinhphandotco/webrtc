import React from 'react';
import PropTypes from 'prop-types';
import StyledMessage from './styled';

export default class Message extends React.Component {
  static propTypes = {
    data: PropTypes.object,
  }

  static defaultProps = {
    data: {},
  }

  render() {
    const { data } = this.props;

    return (
      <StyledMessage me={data.me} other={!data.me}>
        <StyledMessage.Avatar src="https://www.ischool.berkeley.edu/sites/default/files/styles/fullscreen/public/default_images/avatar.jpeg?itok=x4ls-bFQ"></StyledMessage.Avatar>
        <StyledMessage.Main>
          <StyledMessage.Text>{data.message}</StyledMessage.Text>
          <StyledMessage.Time>11:30</StyledMessage.Time>
        </StyledMessage.Main>
      </StyledMessage>
    );
  }
}
