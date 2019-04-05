import React from 'react';
import PropTypes from 'prop-types';
import StyledLoading from './styled';

const Loading = ({ children }) => (
  <StyledLoading>
    <StyledLoading.Circle1 />
    <StyledLoading.Circle2 />
    <StyledLoading.Circle3 />
    <StyledLoading.Icon />
    {children}
  </StyledLoading>
);

Loading.propTypes = {
  children: PropTypes.node,
};

Loading.defaultProps = {
  children: () => null,
};

export default Loading;
